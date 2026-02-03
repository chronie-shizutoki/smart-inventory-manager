import os
import sqlite3

# Get the database path
db_dir = os.path.join(os.path.dirname(__file__), 'database')
db_path = os.path.join(db_dir, 'app.db')

# Connect to the database
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

try:
    # Add usage_count column
    try:
        cursor.execute("ALTER TABLE inventory_items ADD COLUMN usage_count INTEGER NOT NULL DEFAULT 0")
        print("Add usage_count column successfully")
    except sqlite3.OperationalError as e:
        print(f"Add usage_count column error: {e}")

    # Add last_used_at column
    try:
        cursor.execute("ALTER TABLE inventory_items ADD COLUMN last_used_at TIMESTAMP")
        print("Add last_used_at column successfully")
    except sqlite3.OperationalError as e:
        print(f"Add last_used_at column error: {e}")

    conn.commit()
except Exception as e:
    print(f"Error: {e}")
finally:
    conn.close()