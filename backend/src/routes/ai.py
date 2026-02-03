import os
import tempfile
import logging
import json
import base64
import requests
from datetime import datetime
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename

# Set up logging
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

ai_bp = Blueprint('ai', __name__)

# Supported image types
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# Check if the file is an allowed image type
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Generate inventory records from images
@ai_bp.route('/generate-records', methods=['POST'])
def generate_records():
    try:
        logger.info('Received AI record generation request')
        
        # Check request parameters
        if 'api_key' not in request.form:
            return jsonify({
                'success': False,
                'message': 'API key is required'
            }), 400
        
        api_key = request.form['api_key']
        
        # Check if any images are uploaded
        if 'images' not in request.files:
            return jsonify({
                'success': False,
                'message': 'No images provided'
            }), 400
        
        # Get all uploaded images
        images = request.files.getlist('images')
        
        if not images or all(img.filename == '' for img in images):
            return jsonify({
                'success': False,
                'message': 'No valid images provided'
            }), 400
        
        # Prepare image data
        processed_images = []
        for img in images:
            if img and allowed_file(img.filename):
                filename = secure_filename(img.filename)
                logger.info(f'Processing image: {filename}')
                
                # Save temporary file
                with tempfile.NamedTemporaryFile(delete=False, suffix=f'.{filename.rsplit(".", 1)[1].lower()}') as temp_file:
                    img.save(temp_file)
                    temp_file_path = temp_file.name
                
                # Read image and convert to base64
                with open(temp_file_path, 'rb') as f:
                    img_data = base64.b64encode(f.read()).decode('utf-8')
                
                # Clean up temporary file
                os.unlink(temp_file_path)
                
                processed_images.append({
                    'data': img_data,
                    'type': img.content_type
                })
            else:
                logger.warning(f'Skipping invalid file: {img.filename}')
        
        if not processed_images:
            return jsonify({
                'success': False,
                'message': 'No valid images processed'
            }), 400
        
        # Call SiliconFlow API for image AI analysis
        logger.info(f'Calling SiliconFlow API with {len(processed_images)} images')
        records = analyze_images_with_siliconflow(processed_images, api_key)
        
        # Process analysis results
        if not records:
            return jsonify({
                'success': False,
                'message': 'Failed to generate records from images'
            }), 500
        
        # Back success response
        return jsonify({
            'success': True,
            'records': records,
            'message': f'Successfully generated {len(records)} records'
        })
        
    except Exception as e:
        logger.error(f'Error generating AI records: {str(e)}')
        return jsonify({
            'success': False,
            'message': f'Error generating records: {str(e)}'
        }), 500

# Call SiliconFlow API for image AI analysis
def analyze_images_with_siliconflow(images, api_key):
    try:
        # Build request data
        current_date = datetime.now()
        date_str = current_date.strftime('%Y-%m-%d')
        weekday_map = {0: 'Monday', 1: 'Tuesday', 2: 'Wednesday', 3: 'Thursday', 4: 'Friday', 5: 'Saturday', 6: 'Sunday'}
        weekday_str = weekday_map[current_date.weekday()]
        
        messages = [{
            'role': 'system', 
            'content': f'''
You are an intelligent inventory record generator that needs to identify items from images and generate inventory records.

Current date information: Today is {date_str}, {weekday_str}. Use this information to generate realistic expiry dates and ensure dates are in the future.

Please analyze all items in the images and output JSON data in the following format:
{{
  "records": [
    {{
      "name": "Item Name",
      "category": "Item Category",
      "quantity": Item Quantity,
      "unit": "Quantity Unit",
      "expiryDate": "Expiry Date (if any, format: YYYY-MM-DD)",
      "description": "Item Description (optional)"
    }}
  ]
}}

Item Category can only be one of the following: food, medicine, cleaning, personal, household, electronics

Please ensure the output JSON format is correct and does not include any additional text.
'''
        }, {
            'role': 'user',
            'content': [{'type': 'text', 'text': 'Please analyze these images and generate inventory records.'}]
        }]
        
        # Add image data
        for img in images:
            messages[1]['content'].append({
                'type': 'image_url',
                'image_url': {
                    'url': f"data:{img['type']};base64,{img['data']}"
                }
            })
        
        # Call SiliconFlow API
        headers = {
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json'
        }
        
        data = {
            'model': 'THUDM/GLM-4.1V-9B-Thinking',
            'messages': messages,
            'max_tokens': 1000,
            'temperature': 0.2
        }
        
        # Call SiliconFlow API
        response = requests.post(
            'https://api.siliconflow.cn/v1/chat/completions',
            headers=headers,
            json=data
        )
        
        # Check response status
        if response.status_code != 200:
            logger.error(f'SiliconFlow API returned non-200 status code: {response.status_code}, response: {response.text}')
            raise Exception(f'SiliconFlow API error: {response.status_code} - {response.text}')
        
        # Parse response
        result = response.json()
        content = result['choices'][0]['message']['content']
        
        # Parse JSON result
        parsed_result = json.loads(content)
        records = parsed_result.get('records', [])
        
        # Validate record format
        validated_records = []
        valid_categories = ['food', 'medicine', 'cleaning', 'personal', 'household', 'electronics']
        
        for record in records:
            # Check required fields
            if all(k in record for k in ['name', 'category', 'quantity', 'unit']):
                # Validate category
                if record['category'] in valid_categories:
                    # Normalize data
                    validated_record = {
                        'name': record['name'].strip(),
                        'category': record['category'],
                        'quantity': max(1, int(record['quantity'])),
                        'unit': record['unit'].strip(),
                        'description': record.get('description', '').strip()
                    }
                    
                    # Handle expiry date
                    expiry_date = record.get('expiryDate')
                    if expiry_date:
                        try:
                            # Try to parse date format
                            date_obj = datetime.strptime(expiry_date, '%Y-%m-%d')
                            validated_record['expiryDate'] = date_obj.strftime('%Y-%m-%d')
                        except ValueError:
                            # If date format is incorrect, ignore it
                            pass
                    
                    validated_records.append(validated_record)
        
        return validated_records
        
    except Exception as e:
        logger.error(f'Error calling SiliconFlow API: {str(e)}')
        raise