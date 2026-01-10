from flask import Blueprint, request, jsonify
import requests
from src.models.inventory import db, InventoryItem, Category
from datetime import datetime, date, timedelta
from sqlalchemy import or_
from src.translations import get_translation

inventory_bp = Blueprint('inventory', __name__)

# 获取所有库存物品
@inventory_bp.route('/items', methods=['GET'])
def get_items():
    try:
        # 获取查询参数
        search = request.args.get('search', '')
        category = request.args.get('category', '')
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 50))
        
        # 构建查询
        query = InventoryItem.query
        
        # 搜索过滤
        if search:
            query = query.filter(or_(
                InventoryItem.name.contains(search),
                InventoryItem.description.contains(search)
            ))
        
        # 分类过滤
        if category:
            query = query.filter(InventoryItem.category == category)
        
        # 分页
        items = query.paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        return jsonify({
            'success': True,
            'data': [item.to_dict() for item in items.items],
            'pagination': {
                'page': page,
                'pages': items.pages,
                'per_page': per_page,
                'total': items.total
            }
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

# 获取单个库存物品
@inventory_bp.route('/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    try:
        item = InventoryItem.query.get_or_404(item_id)
        return jsonify({
            'success': True,
            'data': item.to_dict()
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

# 创建新的库存物品
@inventory_bp.route('/items', methods=['POST'])
def create_item():
    try:
        data = request.get_json()
        
        # 验证必需字段
        required_fields = ['name', 'category', 'quantity', 'unit']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({
                    'success': False, 
                    'error': f'Missing required field: {field}'
                }), 400
        
        # 创建新物品
        item = InventoryItem.from_dict(data)
        db.session.add(item)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'data': item.to_dict(),
            'message': 'Item created successfully'
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500

# 更新库存物品
@inventory_bp.route('/items/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    try:
        item = InventoryItem.query.get_or_404(item_id)
        data = request.get_json()
        
        item.update_from_dict(data)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'data': item.to_dict(),
            'message': 'Item updated successfully'
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500

# 删除库存物品
@inventory_bp.route('/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    try:
        item = InventoryItem.query.get_or_404(item_id)
        
        db.session.delete(item)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Item deleted successfully'
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500

# 获取库存统计
@inventory_bp.route('/stats', methods=['GET'])
def get_stats():
    try:
        total_items = InventoryItem.query.count()
        
        # 库存不足的物品
        low_stock_items = InventoryItem.query.filter(
            InventoryItem.quantity <= InventoryItem.min_quantity
        ).count()
        
        # 即将过期的物品（7天内）
        seven_days_later = date.today() + timedelta(days=7)
        expiring_soon_items = InventoryItem.query.filter(
            InventoryItem.expiry_date.between(date.today(), seven_days_later)
        ).count()
        
        # 已过期的物品
        expired_items = InventoryItem.query.filter(
            InventoryItem.expiry_date < date.today()
        ).count()
        
        # 分类统计
        categories = db.session.query(InventoryItem.category).distinct().count()
        
        return jsonify({
            'success': True,
            'data': {
                'totalItems': total_items,
                'lowStockItems': low_stock_items,
                'expiringSoonItems': expiring_soon_items,
                'expiredItems': expired_items,
                'categories': categories
            }
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

# 获取分类列表
@inventory_bp.route('/categories', methods=['GET'])
def get_categories():
    try:
        # 从库存物品中获取所有使用的分类
        categories = db.session.query(InventoryItem.category).distinct().all()
        category_list = [cat[0] for cat in categories]
        
        return jsonify({
            'success': True,
            'data': category_list
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500



# 记录物品使用
@inventory_bp.route('/items/<int:item_id>/use', methods=['POST'])
def record_item_usage(item_id):
    try:
        item = InventoryItem.query.get_or_404(item_id)
        
        # 检查物品是否有足够库存
        if item.quantity > 0:
            # 减少物品数量
            item.quantity -= 1
            # 增加使用计数
            item.usage_count += 1
            # 更新最后使用时间
            item.last_used_at = datetime.utcnow()
            
            db.session.commit()
            
            # 返回不带硬编码中文的成功响应
            return jsonify({
                'success': True,
                'message_code': 'itemUsedSuccessfully',
                'message_data': {
                        'itemName': item.name,
                        'quantity': item.quantity,
                        'unit': item.unit
                    },
                'data': item.to_dict()
            })
        else:
            # 返回库存不足错误，不包含硬编码中文
            return jsonify({
                'success': False,
                'error_code': 'insufficientStock',
                'error_data': {
                        'itemName': item.name
                    }
            }), 400
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500



# 采购清单生成
@inventory_bp.route('/items/generate-purchase-list', methods=['GET'])
def generate_purchase_list():
    try:
        # 获取所有库存不足的物品
        low_stock_items = InventoryItem.query.filter(
            InventoryItem.quantity <= InventoryItem.min_quantity
        ).all()

        # 构建采购清单
        purchase_list = []
        for item in low_stock_items:
            # 计算建议采购数量（最低库存的1.5倍减去当前库存）
            suggested_quantity = max(1, int(item.min_quantity * 1.5 - item.quantity))
            purchase_list.append({
                'id': item.id,
                'name': item.name,
                'category': item.category,
                'currentQuantity': item.quantity,
                'minQuantity': item.min_quantity,
                'suggestedQuantity': suggested_quantity,
                'unit': item.unit,
                'lastUsedAt': item.last_used_at.isoformat() if item.last_used_at else None
            })

        # 按分类排序
        purchase_list.sort(key=lambda x: x['category'])

        return jsonify({
            'success': True,
            'data': purchase_list
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


# 批量操作
@inventory_bp.route('/items/batch', methods=['POST'])
def batch_operations():
    try:
        data = request.get_json()
        operation = data.get('operation')
        item_ids = data.get('itemIds', [])
        
        if operation == 'delete':
            # 批量删除
            InventoryItem.query.filter(InventoryItem.id.in_(item_ids)).delete(synchronize_session=False)
            SmartAlert.query.filter(SmartAlert.item_id.in_(item_ids)).delete(synchronize_session=False)
            db.session.commit()
            
            return jsonify({
                'success': True,
                'message': f'Successfully deleted {len(item_ids)} items'
            })
        
        elif operation == 'update_category':
            # 批量更新分类
            new_category = data.get('newCategory')
            if not new_category:
                return jsonify({'success': False, 'error': 'New category is required'}), 400
            
            InventoryItem.query.filter(InventoryItem.id.in_(item_ids)).update(
                {'category': new_category, 'updated_at': datetime.utcnow()},
                synchronize_session=False
            )
            db.session.commit()
            
            return jsonify({
                'success': True,
                'message': f'Successfully updated category for {len(item_ids)} items'
            })
        
        else:
            return jsonify({'success': False, 'error': 'Invalid operation'}), 400
            
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500


# 代理外部记账本API请求
@inventory_bp.route('/expenses', methods=['GET'])
def proxy_expenses():
    try:
        # 获取所有请求参数
        params = request.args.to_dict()
        
        # 外部记账本API URL
        external_api_url = 'http://192.168.0.197:3010/api/expenses'
        
        # 发送请求到外部API，传递所有参数
        response = requests.get(external_api_url, params=params)
        
        # 将外部API的响应返回给前端
        return jsonify(response.json()), response.status_code
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

