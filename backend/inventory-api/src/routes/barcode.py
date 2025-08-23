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
    logger.info(f'Request method: {request.method}')
    logger.info(f'Request headers: {dict(request.headers)}')
    logger.info(f'Request args: {dict(request.args)}')
    logger.info(f'Request form: {dict(request.form)}')
    logger.info(f'Request files: {list(request.files.keys())}')
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
        
        # 尝试高级图像处理以提高条形码识别率
        logger.info('Processing image for better barcode recognition...')
        
        # 1. 转换为灰度图
        image = image.convert('L')
        
        # 2. 增强对比度
        from PIL import ImageEnhance
        enhancer = ImageEnhance.Contrast(image)
        image = enhancer.enhance(2.0)
        
        # 3. 锐化图像
        enhancer = ImageEnhance.Sharpness(image)
        image = enhancer.enhance(2.0)
        
        # 4. 二值化处理（阈值为128）
        from PIL import ImageOps
        image = ImageOps.autocontrast(image, cutoff=2)
        
        logger.info('Decoding barcode...')
        barcodes = pyzbar.decode(image)
        
        # 只保留条形码，过滤掉二维码等其他类型
        barcode_types = {'EAN-13', 'EAN-8', 'UPC-A', 'UPC-E', 'Code-128', 'Code-39', 'Code-93', 'ITF', 'Codabar'}
        barcodes = [barcode for barcode in barcodes if barcode.type in barcode_types]
        logger.info(f'Filtered barcode count (only barcodes): {len(barcodes)}')

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