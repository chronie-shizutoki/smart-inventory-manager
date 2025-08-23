from flask import Blueprint, request, jsonify
import os
import tempfile
import logging
from PIL import Image
import pyzbar.pyzbar as pyzbar

# 设置日志
logger = logging.getLogger(__name__)

barcode_bp = Blueprint('barcode', __name__)

@barcode_bp.route('/recognize', methods=['POST'])
def recognize_barcode():
    logger.info('Received barcode recognition request')
    try:
        # 设置最大文件大小为10MB
        logger.info(f'Request content length: {request.content_length}')
        if request.content_length and request.content_length > 10 * 1024 * 1024:
            return jsonify({
                'success': False,
                'message': 'File too large (max 10MB)'
            }), 413
        # 检查是否有文件上传
        logger.info(f'Request files: {list(request.files.keys())}')
        if 'image' not in request.files:
            return jsonify({
                'success': False,
                'message': 'No image file provided'
            }), 400

        file = request.files['image']
        logger.info(f'File received: {file.filename}, content type: {file.content_type}')

        # 检查文件是否为空
        if file.filename == '':
            return jsonify({
                'success': False,
                'message': 'Empty file provided'
            }), 400

        # 保存临时文件
        logger.info('Saving temporary file')
        with tempfile.NamedTemporaryFile(delete=False, suffix='.' + file.filename.split('.')[-1]) as temp_file:
            temp_file.write(file.read())
            temp_file_path = temp_file.name

        # 读取图片并识别条形码
        logger.info(f'Opening image file: {temp_file_path}')
        image = Image.open(temp_file_path)
        logger.info('Decoding barcode...')
        barcodes = pyzbar.decode(image)

        # 删除临时文件
        logger.info(f'Deleting temporary file: {temp_file_path}')
        os.unlink(temp_file_path)

        logger.info(f'Barcode count: {len(barcodes)}')
        if not barcodes:
            return jsonify({
                'success': False,
                'message': 'No barcode found in image'
            }), 400

        # 提取条形码数据
        logger.info('Extracting barcode data')
        barcode_data = barcodes[0].data.decode('utf-8')

        # 返回成功响应
        return jsonify({
            'success': True,
            'barcode': barcode_data
        }), 200

    except Exception as e:
        logger.error(f'Error processing barcode: {str(e)}', exc_info=True)
        return jsonify({
            'success': False,
            'message': f'Error processing image: {str(e)}'
        }), 500