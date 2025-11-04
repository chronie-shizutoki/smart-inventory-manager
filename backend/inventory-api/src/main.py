import os
import sys
import psutil
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory
from sqlalchemy import text
from flask_cors import CORS
from src.models.user import db
from src.routes.user import user_bp
from src.routes.inventory import inventory_bp
from src.routes.ai import ai_bp

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))
app.config['SECRET_KEY'] = 'asdf#FGSgvasgf$5$WGT'

# 启用CORS支持
CORS(app)

app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(inventory_bp, url_prefix='/api/inventory')
app.register_blueprint(ai_bp, url_prefix='/api/ai')

# 确保数据库目录存在
db_dir = os.path.join(os.path.dirname(__file__), 'database')
os.makedirs(db_dir, exist_ok=True)

# 配置数据库
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(db_dir, 'app.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

with app.app_context():
    db.create_all()
    
    # 导入库存模型
    from src.models.inventory import InventoryItem, Category
    
    # 初始化示例数据
    if InventoryItem.query.count() == 0:
        sample_items = [
            {
                'name': '牛奶',
                'category': 'food',
                'quantity': 2,
                'unit': '瓶',
                'minQuantity': 1,
                'expiryDate': '2025-02-15',
                'description': '全脂牛奶'
            },
            {
                'name': '感冒药',
                'category': 'medicine',
                'quantity': 1,
                'unit': '盒',
                'minQuantity': 2,
                'expiryDate': '2025-12-31',
                'description': '治疗感冒症状'
            },
            {
                'name': '洗洁精',
                'category': 'cleaning',
                'quantity': 1,
                'unit': '瓶',
                'minQuantity': 1,
                'expiryDate': '2026-01-01',
                'description': '厨房清洁用品'
            }
        ]
        
        for item_data in sample_items:
            item = InventoryItem.from_dict(item_data)
            db.session.add(item)
        
        db.session.commit()

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    static_folder_path = app.static_folder
    if static_folder_path is None:
        return "Static folder not configured", 404

    # Normalize and validate the path to prevent path traversal
    requested_path = os.path.normpath(os.path.join(static_folder_path, path))
    if path != "" and requested_path.startswith(static_folder_path) and os.path.exists(requested_path):
        # Only serve if the normalized path is within the static folder
        return send_from_directory(static_folder_path, path)
    else:
        index_path = os.path.join(static_folder_path, 'index.html')
        if os.path.exists(index_path):
            return send_from_directory(static_folder_path, 'index.html')
        else:
            return "index.html not found", 404

# 生产环境应该使用WSGI服务器如Gunicorn或uWSGI来运行应用
# 例如: gunicorn -w 4 -b 0.0.0.0:5000 src.main:app

# 仅在直接运行脚本时启动开发服务器（用于开发测试）
@app.route('/api/health')
def health_check():
    """
    健康检查端点，返回应用状态信息
    """
    try:
        # 检查数据库连接
        with app.app_context():
            db.session.execute(text('SELECT 1'))
        db_status = 'healthy'
    except Exception as e:
        db_status = f'error: {str(e)}'
    
    # 获取内存使用情况
    try:
        process = psutil.Process()
        memory_info = process.memory_info()
        memory_usage = {
            'rss': memory_info.rss,  # 物理内存使用量(字节)
            'rss_mb': round(memory_info.rss / (1024 * 1024), 2),  # 转换为MB
            'vms': memory_info.vms,  # 虚拟内存使用量(字节)
            'vms_mb': round(memory_info.vms / (1024 * 1024), 2)  # 转换为MB
        }
    except Exception as e:
        memory_usage = f'error: {str(e)}'
    
    return {
        'status': 'healthy',
        'database': db_status,
        'memory_usage': memory_usage,
        'service': 'smart-inventory-manager',
        'version': '1.0.0'
    }

if __name__ == '__main__':
    debug_mode = os.environ.get('FLASK_DEBUG', '0').lower() in ('1', 'true', 'yes')
    print("警告：这是开发服务器，仅用于开发和测试。生产环境请使用WSGI服务器。")
    app.run(host='0.0.0.0', port=5000, debug=debug_mode)
