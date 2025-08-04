from flask import Blueprint, request, jsonify
from src.models.inventory import db, InventoryItem, Category, SmartAlert
from datetime import datetime, date, timedelta
from sqlalchemy import or_

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
        
        # 删除相关的智能提醒
        SmartAlert.query.filter_by(item_id=item_id).delete()
        
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

# 获取智能提醒
@inventory_bp.route('/alerts', methods=['GET'])
def get_smart_alerts():
    try:
        alerts = []
        today = date.today()
        
        # 检查过期和即将过期的物品
        items = InventoryItem.query.all()
        for item in items:
            if item.expiry_date:
                days_until_expiry = (item.expiry_date - today).days
                
                if days_until_expiry < 0:
                    # 已过期
                    alerts.append({
                        'id': f'expired-{item.id}',
                        'type': 'error',
                        'title': '物品已过期',
                        'message': f'{item.name} 已过期 {abs(days_until_expiry)} 天',
                        'itemId': item.id
                    })
                elif days_until_expiry <= 3:
                    # 即将过期
                    alerts.append({
                        'id': f'expiring-{item.id}',
                        'type': 'warning',
                        'title': '即将过期',
                        'message': f'{item.name} 将在 {days_until_expiry} 天后过期',
                        'itemId': item.id
                    })
            
            # 检查库存不足
            if item.quantity <= item.min_quantity:
                alerts.append({
                    'id': f'lowstock-{item.id}',
                    'type': 'warning',
                    'title': '库存不足',
                    'message': f'{item.name} 库存仅剩 {item.quantity} {item.unit}',
                    'itemId': item.id
                })
        
        return jsonify({
            'success': True,
            'data': alerts
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

# 获取智能推荐
@inventory_bp.route('/recommendations', methods=['GET'])
def get_smart_recommendations():
    try:
        recommendations = []
        
        # 基于库存不足的推荐
        low_stock_items = InventoryItem.query.filter(
            InventoryItem.quantity <= InventoryItem.min_quantity
        ).all()
        
        for item in low_stock_items:
            recommendations.append({
                'id': f'restock-{item.id}',
                'title': f'建议补充 {item.name}',
                'reason': f'当前库存 {item.quantity} {item.unit}，低于最低库存 {item.min_quantity} {item.unit}',
                'itemId': item.id
            })
        
        # 基于使用频率的推荐（模拟数据）
        if len(recommendations) < 3:
            recommendations.append({
                'id': 'frequent-use',
                'title': '建议补充常用物品',
                'reason': '根据使用频率分析，建议提前采购牛奶和面包',
                'itemId': None
            })
        
        return jsonify({
            'success': True,
            'data': recommendations
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

