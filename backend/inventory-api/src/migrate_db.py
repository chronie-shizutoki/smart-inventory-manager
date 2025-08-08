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
    cursor.execute("ALTER TABLE inventory_items ADD COLUMN usage_count INTEGER NOT NULL DEFAULT 0")
    print("添加usage_count列成功")
    # 添加last_used_at列
    cursor.execute("ALTER TABLE inventory_items ADD COLUMN last_used_at TIMESTAMP")
    print("添加last_used_at列成功")
    conn.commit()
except sqlite3.OperationalError as e:
    print(f"错误: {e}")
    print("可能这些列已经存在")
finally:
    conn.close()