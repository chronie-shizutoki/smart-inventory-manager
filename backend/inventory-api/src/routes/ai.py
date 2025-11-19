import os
import tempfile
import logging
import json
import base64
import requests
from datetime import datetime
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename

# 设置日志
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

ai_bp = Blueprint('ai', __name__)

# 支持的图片类型
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# 检查文件是否为允许的图片类型
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# 从图片生成库存记录
@ai_bp.route('/generate-records', methods=['POST'])
def generate_records():
    try:
        logger.info('Received AI record generation request')
        
        # 检查请求参数
        if 'api_key' not in request.form:
            return jsonify({
                'success': False,
                'message': 'API key is required'
            }), 400
        
        api_key = request.form['api_key']
        
        # 检查是否有文件上传
        if 'images' not in request.files:
            return jsonify({
                'success': False,
                'message': 'No images provided'
            }), 400
        
        # 获取上传的所有图片
        images = request.files.getlist('images')
        
        if not images or all(img.filename == '' for img in images):
            return jsonify({
                'success': False,
                'message': 'No valid images provided'
            }), 400
        
        # 准备图片数据
        processed_images = []
        for img in images:
            if img and allowed_file(img.filename):
                filename = secure_filename(img.filename)
                logger.info(f'Processing image: {filename}')
                
                # 保存临时文件
                with tempfile.NamedTemporaryFile(delete=False, suffix=f'.{filename.rsplit(".", 1)[1].lower()}') as temp_file:
                    img.save(temp_file)
                    temp_file_path = temp_file.name
                
                # 读取图片并转换为base64
                with open(temp_file_path, 'rb') as f:
                    img_data = base64.b64encode(f.read()).decode('utf-8')
                
                # 清理临时文件
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
        
        # 调用SiliconFlow API进行图片分析
        logger.info(f'Calling SiliconFlow API with {len(processed_images)} images')
        records = analyze_images_with_siliconflow(processed_images, api_key)
        
        # 处理分析结果
        if not records:
            return jsonify({
                'success': False,
                'message': 'Failed to generate records from images'
            }), 500
        
        # 返回成功响应
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

# 调用SiliconFlow API分析图片
def analyze_images_with_siliconflow(images, api_key):
    try:
        # 构建请求数据
        messages = [{
            'role': 'system', 
            'content': '''
你是一个智能库存记录生成器，需要从图片中识别物品并生成库存记录。

请分析图片中的所有物品，并按照以下格式输出JSON数据：
{
  "records": [
    {
      "name": "物品名称",
      "category": "物品分类",
      "quantity": 物品数量,
      "unit": "数量单位",
      "expiryDate": "过期日期（如果有，格式：YYYY-MM-DD）",
      "description": "物品描述（可选）"
    }
  ]
}

物品分类只能是以下之一：food, medicine, cleaning, personal, household, electronics

请确保输出的JSON格式正确，不要包含任何其他文本。
'''
        }, {
            'role': 'user',
            'content': [{'type': 'text', 'text': '请分析这些图片并生成库存记录。'}]
        }]
        
        # 添加图片数据
        for img in images:
            messages[1]['content'].append({
                'type': 'image_url',
                'image_url': {
                    'url': f"data:{img['type']};base64,{img['data']}"
                }
            })
        
        # 调用SiliconFlow API
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
        
        # 使用SiliconFlow的API端点
        response = requests.post(
            'https://api.siliconflow.cn/v1/chat/completions',
            headers=headers,
            json=data
        )
        
        # 检查响应状态
        if response.status_code != 200:
            logger.error(f'SiliconFlow API returned non-200 status code: {response.status_code}, response: {response.text}')
            raise Exception(f'SiliconFlow API error: {response.status_code} - {response.text}')
        
        # 解析响应
        result = response.json()
        content = result['choices'][0]['message']['content']
        
        # 解析JSON结果
        parsed_result = json.loads(content)
        records = parsed_result.get('records', [])
        
        # 验证记录格式
        validated_records = []
        valid_categories = ['food', 'medicine', 'cleaning', 'personal', 'household', 'electronics']
        
        for record in records:
            # 确保必填字段存在
            if all(k in record for k in ['name', 'category', 'quantity', 'unit']):
                # 验证分类
                if record['category'] in valid_categories:
                    # 规范化数据
                    validated_record = {
                        'name': record['name'].strip(),
                        'category': record['category'],
                        'quantity': max(1, int(record['quantity'])),
                        'unit': record['unit'].strip(),
                        'description': record.get('description', '').strip()
                    }
                    
                    # 处理过期日期
                    expiry_date = record.get('expiryDate')
                    if expiry_date:
                        try:
                            # 尝试解析日期格式
                            date_obj = datetime.strptime(expiry_date, '%Y-%m-%d')
                            validated_record['expiryDate'] = date_obj.strftime('%Y-%m-%d')
                        except ValueError:
                            # 如果日期格式不正确，则忽略
                            pass
                    
                    validated_records.append(validated_record)
        
        return validated_records
        
    except Exception as e:
        logger.error(f'Error calling SiliconFlow API: {str(e)}')
        raise