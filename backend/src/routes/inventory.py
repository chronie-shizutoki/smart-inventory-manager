from flask import Blueprint, request, jsonify
import requests
from src.models.inventory import db, InventoryItem, Category
from datetime import datetime, date, timedelta
from sqlalchemy import or_
from src.translations import get_translation
import logging

logger = logging.getLogger(__name__)

inventory_bp = Blueprint('inventory', __name__)

# Get all inventory items
@inventory_bp.route('/items', methods=['GET'])
def get_items():
    try:
        # Get query parameters
        search = request.args.get('search', '')
        category = request.args.get('category', '')
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 50))
        
        # Build query
        query = InventoryItem.query
        
        # Search filtering
        if search:
            query = query.filter(or_(
                InventoryItem.name.contains(search),
                InventoryItem.description.contains(search)
            ))
        
        # Category filtering
        if category:
            query = query.filter(InventoryItem.category == category)
        
        # Pagination
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
        logger.error(f'Error in get_items: {str(e)}', exc_info=True)
        return jsonify({'success': False, 'error': 'Internal server error'}), 500

# Get a single inventory item
@inventory_bp.route('/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    try:
        item = InventoryItem.query.get_or_404(item_id)
        return jsonify({
            'success': True,
            'data': item.to_dict()
        })
    except Exception as e:
        logger.error(f'Error in get_item: {str(e)}', exc_info=True)
        return jsonify({'success': False, 'error': 'Internal server error'}), 500

# Create a new inventory item
@inventory_bp.route('/items', methods=['POST'])
def create_item():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'category', 'quantity', 'unit']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({
                    'success': False, 
                    'error': f'Missing required field: {field}'
                }), 400
        
        # Create new item
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
        logger.error(f'Error in create_item: {str(e)}', exc_info=True)
        return jsonify({'success': False, 'error': 'Internal server error'}), 500

# Update an inventory item
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
        logger.error(f'Error in update_item: {str(e)}', exc_info=True)
        return jsonify({'success': False, 'error': 'Internal server error'}), 500

# Delete an inventory item
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
        logger.error(f'Error in delete_item: {str(e)}', exc_info=True)
        return jsonify({'success': False, 'error': 'Internal server error'}), 500

# Get inventory statistics
@inventory_bp.route('/stats', methods=['GET'])
def get_stats():
    try:
        total_items = InventoryItem.query.count()
        
        # Items with low stock (below minimum quantity)
        low_stock_items = InventoryItem.query.filter(
            InventoryItem.quantity <= InventoryItem.min_quantity
        ).count()
        
        # Items expiring soon (7 days)
        seven_days_later = date.today() + timedelta(days=7)
        expiring_soon_items = InventoryItem.query.filter(
            InventoryItem.expiry_date.between(date.today(), seven_days_later)
        ).count()
        
        # Expired items
        expired_items = InventoryItem.query.filter(
            InventoryItem.expiry_date < date.today()
        ).count()
        
        # Category statistics
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
        logger.error(f'Error in get_stats: {str(e)}', exc_info=True)
        return jsonify({'success': False, 'error': 'Internal server error'}), 500

# Get list of categories
@inventory_bp.route('/categories', methods=['GET'])
def get_categories():
    try:
        # Get all distinct categories from inventory items
        categories = db.session.query(InventoryItem.category).distinct().all()
        category_list = [cat[0] for cat in categories]
        
        return jsonify({
            'success': True,
            'data': category_list
        })
    except Exception as e:
        logger.error(f'Error in get_categories: {str(e)}', exc_info=True)
        return jsonify({'success': False, 'error': 'Internal server error'}), 500

# Record item usage
@inventory_bp.route('/items/<int:item_id>/use', methods=['POST'])
def record_item_usage(item_id):
    try:
        item = InventoryItem.query.get_or_404(item_id)
        
        # Check if item has sufficient stock
        if item.quantity > 0:
            # Decrease item quantity
            item.quantity -= 1
            # Increase usage count
            item.usage_count += 1
            # Update last used time
            item.last_used_at = datetime.utcnow()
            
            db.session.commit()
            
            # Return success response without hardcoded text
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
            # Return insufficient stock error without hardcoded text
            return jsonify({
                'success': False,
                'error_code': 'insufficientStock',
                'error_data': {
                        'itemName': item.name
                    }
            }), 400
    except Exception as e:
        logger.error(f'Error in record_item_usage: {str(e)}', exc_info=True)
        return jsonify({'success': False, 'error': 'Internal server error'}), 500



# Generate purchase list for low stock items
@inventory_bp.route('/items/generate-purchase-list', methods=['GET'])
def generate_purchase_list():
    try:
        # Get all items with low stock (below minimum quantity)
        low_stock_items = InventoryItem.query.filter(
            InventoryItem.quantity <= InventoryItem.min_quantity
        ).all()

        # Build purchase list
        purchase_list = []
        for item in low_stock_items:
            # Calculate suggested purchase quantity (1.5 times min quantity minus current quantity)
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

        # Sort purchase list by category
        purchase_list.sort(key=lambda x: x['category'])

        return jsonify({
            'success': True,
            'data': purchase_list
        })
    except Exception as e:
        logger.error(f'Error in generate_purchase_list: {str(e)}', exc_info=True)
        return jsonify({'success': False, 'error': 'Internal server error'}), 500


# Batch operations for inventory items
@inventory_bp.route('/items/batch', methods=['POST'])
def batch_operations():
    try:
        data = request.get_json()
        operation = data.get('operation')
        item_ids = data.get('itemIds', [])
        
        if operation == 'delete':
            # Delete items and associated alerts
            InventoryItem.query.filter(InventoryItem.id.in_(item_ids)).delete(synchronize_session=False)
            SmartAlert.query.filter(SmartAlert.item_id.in_(item_ids)).delete(synchronize_session=False)
            db.session.commit()
            
            return jsonify({
                'success': True,
                'message': f'Successfully deleted {len(item_ids)} items'
            })
        
        elif operation == 'update_category':
            # Batch update categories
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
        logger.error(f'Error in batch_operations: {str(e)}', exc_info=True)
        return jsonify({'success': False, 'error': 'Internal server error'}), 500


# Proxy requests to external expense tracking API
@inventory_bp.route('/expenses', methods=['GET'])
def proxy_expenses():
    try:
        # Get all request parameters
        params = request.args.to_dict()
        
        # Third-Party Expense Tracking API URL
        external_api_url = 'http://192.168.0.197:3010/api/expenses'
        
        # Send request to external API, passing all parameters
        response = requests.get(external_api_url, params=params)
        
        # Return external API response to frontend
        return jsonify(response.json()), response.status_code
        
    except Exception as e:
        logger.error(f'Error in proxy_expenses: {str(e)}', exc_info=True)
        return jsonify({'success': False, 'error': 'Internal server error'}), 500

