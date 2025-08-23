import os
import sqlite3

# 获取数据库路径
db_dir = os.path.join(os.path.dirname(__file__), 'database')
db_path = os.path.join(db_dir, 'app.db')

# 连接到数据库
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

try:
    # 添加usage_count列
    try:
        cursor.execute("ALTER TABLE inventory_items ADD COLUMN usage_count INTEGER NOT NULL DEFAULT 0")
        print("添加usage_count列成功")
    except sqlite3.OperationalError as e:
        print(f"添加usage_count列错误: {e}")

    # 添加barcode列
    try:
        cursor.execute("ALTER TABLE inventory_items ADD COLUMN barcode TEXT")
        print("添加barcode列成功")
    except sqlite3.OperationalError as e:
        print(f"添加barcode列错误: {e}")

    # 添加last_used_at列
    try:
        cursor.execute("ALTER TABLE inventory_items ADD COLUMN last_used_at TIMESTAMP")
        print("添加last_used_at列成功")
    except sqlite3.OperationalError as e:
        print(f"添加last_used_at列错误: {e}")

    conn.commit()
except Exception as e:
    print(f"发生错误: {e}")
finally:
    conn.close()