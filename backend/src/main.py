import os
import sys
import psutil
import logging
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory
from sqlalchemy import text
from flask_cors import CORS
from src.models import db
from src.routes.inventory import inventory_bp
from src.routes.ai import ai_bp

logger = logging.getLogger(__name__)

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))
app.config['SECRET_KEY'] = 'asdf#FGSgvasgf$5$WGT'

# Enable CORS support
CORS(app)

app.register_blueprint(inventory_bp, url_prefix='/api/inventory')
app.register_blueprint(ai_bp, url_prefix='/api/ai')

# Ensure the database directory exists
db_dir = os.path.join(os.path.dirname(__file__), 'database')
os.makedirs(db_dir, exist_ok=True)

# Configure the database
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(db_dir, 'app.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

with app.app_context():
    db.create_all()
    
    # Import inventory models
    from src.models.inventory import InventoryItem, Category

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')

def serve(path):
    static_folder_path = app.static_folder
        # Exclude API routes, only handle frontend static file routes
    if path.startswith('api/'):
        return "API route not found", 404
    
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

# In production, use a WSGI server like Gunicorn or uWSGI to run the application
# Example: gunicorn -w 4 -b 0.0.0.0:5000 src.main:app

# Start the development server only when the script is run directly (for development testing)
@app.route('/api/health')
def health_check():
    """
    Health check endpoint, returns application status information
    """
    try:
        # Check database connection
        with app.app_context():
            db.session.execute(text('SELECT 1'))
        db_status = 'healthy'
    except Exception as e:
        logger.error(f'Database health check failed: {str(e)}', exc_info=True)
        db_status = 'error'
    
    # Get memory usage
    try:
        process = psutil.Process()
        memory_info = process.memory_info()
        memory_usage = {
            'rss': memory_info.rss,  # Physical memory usage (bytes)
            'rss_mb': round(memory_info.rss / (1024 * 1024), 2),  # Convert to MB
            'vms': memory_info.vms,  # Virtual memory usage (bytes)
            'vms_mb': round(memory_info.vms / (1024 * 1024), 2)  # Convert to MB
        }
    except Exception as e:
        logger.error(f'Failed to get memory usage: {str(e)}', exc_info=True)
        memory_usage = {'error': 'Failed to get memory usage'}
    
    return {
        'status': 'healthy',
        'database': db_status,
        'memory_usage': memory_usage,
        'service': 'smart-inventory-manager',
        'version': '2026.02.03'
    }

if __name__ == '__main__':
    debug_mode = os.environ.get('FLASK_DEBUG', '0').lower() in ('1', 'true', 'yes')
    print("WARNING: This is the development server, only for development and testing. Use a WSGI server in production.")
    app.run(host='0.0.0.0', port=5000, debug=debug_mode)
