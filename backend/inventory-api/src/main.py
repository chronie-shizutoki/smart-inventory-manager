import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory
from flask_cors import CORS
from src.models.user import db
from src.routes.user import user_bp
from src.routes.inventory import inventory_bp
from src.routes.barcode import barcode_bp
from src.routes.ai import ai_bp

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))
app.config['SECRET_KEY'] = 'asdf#FGSgvasgf$5$WGT'

# 启用CORS支持
CORS(app)

app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(inventory_bp, url_prefix='/api/inventory')
app.register_blueprint(barcode_bp, url_prefix='/api/barcode')
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
    from src.models.inventory import InventoryItem, Category, SmartAlert
    
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


if __name__ == '__main__':
    debug_mode = os.environ.get('FLASK_DEBUG', '0').lower() in ('1', 'true', 'yes')
    app.run(host='0.0.0.0', port=5000, debug=debug_mode)
