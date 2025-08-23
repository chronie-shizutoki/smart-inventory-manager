from src.models.user import db
from datetime import datetime

class InventoryItem(db.Model):
    __tablename__ = 'inventory_items'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=0)
    unit = db.Column(db.String(20), nullable=False)
    min_quantity = db.Column(db.Integer, nullable=False, default=0)
    expiry_date = db.Column(db.Date, nullable=True)
    description = db.Column(db.Text, nullable=True)
    barcode = db.Column(db.String(50), nullable=True)
    usage_count = db.Column(db.Integer, nullable=False, default=0)
    last_used_at = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'category': self.category,
            'quantity': self.quantity,
            'unit': self.unit,
            'minQuantity': self.min_quantity,
            'expiryDate': self.expiry_date.isoformat() if self.expiry_date else None,
            'description': self.description,
            'barcode': self.barcode,
            'usageCount': self.usage_count,
            'lastUsedAt': self.last_used_at.isoformat() if self.last_used_at else None,
            'createdAt': self.created_at.isoformat(),
            'updatedAt': self.updated_at.isoformat()
        }
    
    @staticmethod
    def from_dict(data):
        item = InventoryItem()
        item.name = data.get('name')
        item.category = data.get('category')
        item.quantity = data.get('quantity', 0)
        item.unit = data.get('unit')
        item.min_quantity = data.get('minQuantity', 0)
        item.usage_count = data.get('usageCount', 0)
        
        # 处理过期日期
        expiry_date_str = data.get('expiryDate')
        if expiry_date_str:
            try:
                item.expiry_date = datetime.fromisoformat(expiry_date_str).date()
            except ValueError:
                item.expiry_date = None
        
        # 处理最后使用时间
        last_used_at_str = data.get('lastUsedAt')
        if last_used_at_str:
            try:
                item.last_used_at = datetime.fromisoformat(last_used_at_str)
            except ValueError:
                item.last_used_at = None
        
        item.description = data.get('description', '')
        item.barcode = data.get('barcode', '')
        return item
    
    def update_from_dict(self, data):
        self.name = data.get('name', self.name)
        self.category = data.get('category', self.category)
        self.quantity = data.get('quantity', self.quantity)
        self.unit = data.get('unit', self.unit)
        self.min_quantity = data.get('minQuantity', self.min_quantity)
        
        # 处理使用频率字段
        if 'usageCount' in data:
            self.usage_count = data.get('usageCount', self.usage_count)
        
        # 处理最后使用时间
        last_used_at_str = data.get('lastUsedAt')
        if last_used_at_str:
            try:
                self.last_used_at = datetime.fromisoformat(last_used_at_str)
            except ValueError:
                pass
        
        # 处理过期日期
        expiry_date_str = data.get('expiryDate')
        if expiry_date_str:
            try:
                self.expiry_date = datetime.fromisoformat(expiry_date_str).date()
            except ValueError:
                pass
        
        self.description = data.get('description', self.description)
        self.barcode = data.get('barcode', self.barcode)
        self.updated_at = datetime.utcnow()

class Category(db.Model):
    __tablename__ = 'categories'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    icon = db.Column(db.String(50), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'icon': self.icon,
            'createdAt': self.created_at.isoformat()
        }

class SmartAlert(db.Model):
    __tablename__ = 'smart_alerts'
    
    id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey('inventory_items.id'), nullable=False)
    alert_type = db.Column(db.String(20), nullable=False)  # 'expiry', 'low_stock', 'expired'
    title = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)
    is_read = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    
    item = db.relationship('InventoryItem', backref=db.backref('alerts', lazy=True))
    
    def to_dict(self):
        return {
            'id': self.id,
            'itemId': self.item_id,
            'type': self.alert_type,
            'title': self.title,
            'message': self.message,
            'isRead': self.is_read,
            'createdAt': self.created_at.isoformat()
        }

