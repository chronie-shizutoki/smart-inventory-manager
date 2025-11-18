#!/usr/bin/env python3
"""
修复版语言文件转换脚本 v2
将后端的JavaScript格式语言文件转换为Android资源格式
按功能组分类并添加详细注释
修复键名格式（. -> -）和分类逻辑问题
"""

import os
import json
import re
from pathlib import Path

def extract_messages_from_js(js_content):
    """从JavaScript文件中提取消息对象"""
    # 查找 window.enMessages 或其他语言消息对象
    pattern = r'window\.\w+Messages\s*=\s*(\{.*?\});'
    match = re.search(pattern, js_content, re.DOTALL)
    
    if match:
        js_object = match.group(1)
        # 将JavaScript对象转换为Python字典
        try:
            # 简单转换：将单引号替换为双引号，处理undefined为null
            js_object = js_object.replace("'", '"')
            js_object = js_object.replace(': undefined', ': null')
            js_object = js_object.replace('null', '""')  # 将null替换为空字符串
            
            # 处理嵌套对象和数组
            def convert_js_to_py(obj_str):
                # 递归处理嵌套结构
                obj_str = obj_str.strip()
                if obj_str.startswith('{') and obj_str.endswith('}'):
                    # 移除外层大括号
                    inner = obj_str[1:-1].strip()
                    if not inner:
                        return {}
                    
                    result = {}
                    # 分割键值对
                    parts = []
                    current_part = ""
                    brace_count = 0
                    quote_count = 0
                    in_string = False
                    
                    for char in inner:
                        if char == '"' and (not current_part or current_part[-1] != '\\'):
                            quote_count += 1
                            in_string = not in_string
                        elif char == '{' and not in_string:
                            brace_count += 1
                        elif char == '}' and not in_string:
                            brace_count -= 1
                        elif char == ',' and not in_string and brace_count == 0:
                            parts.append(current_part.strip())
                            current_part = ""
                            continue
                        
                        current_part += char
                    
                    if current_part.strip():
                        parts.append(current_part.strip())
                    
                    for part in parts:
                        if ':' in part:
                            key_part, value_part = part.split(':', 1)
                            key = key_part.strip().strip('"')
                            value = value_part.strip()
                            
                            # 递归处理值
                            if value.startswith('{'):
                                result[key] = convert_js_to_py(value)
                            elif value.startswith('['):
                                # 处理数组
                                array_content = value[1:-1].strip()
                                if array_content:
                                    result[key] = [item.strip().strip('"') for item in array_content.split(',')]
                                else:
                                    result[key] = []
                            else:
                                result[key] = value.strip().strip('"')
                    
                    return result
                
                return obj_str.strip().strip('"')
            
            return convert_js_to_py(js_object)
        except Exception as e:
            print(f"转换错误: {e}")
            return None
    return None

def flatten_dict(d, parent_key='', sep='.'):
    """将嵌套字典平铺为键值对"""
    items = []
    for k, v in d.items():
        new_key = f"{parent_key}{sep}{k}" if parent_key else k
        if isinstance(v, dict):
            items.extend(flatten_dict(v, new_key, sep=sep).items())
        else:
            items.append((new_key, str(v)))
    return dict(items)

def convert_key_name(key):
    """将键名从JS格式转换为Android格式：app.title -> app_title"""
    # 将点号替换为下划线，并转换为小写
    android_key = key.replace('.', '_').lower()
    return android_key

def escape_android_string(text):
    """转义Android字符串中的特殊字符"""
    if not text:
        return ""
    
    # 基本转义
    text = str(text)
    text = text.replace('&', '&amp;')
    text = text.replace('<', '&lt;')
    text = text.replace('>', '&gt;')
    text = text.replace('"', '\\"')
    text = text.replace("'", "\\'")
    
    # 处理占位符 {itemName} -> %s
    text = re.sub(r'\{(\w+)\}', r'%s', text)
    
    return text

def generate_android_resources(messages, lang_code):
    """生成Android多语言资源文件 - 按功能组分类并添加注释"""
    android_resources = ['<?xml version="1.0" encoding="utf-8"?>']
    android_resources.append('<resources>')
    
    # 转换键名并创建新的消息字典
    converted_messages = {}
    for key, value in messages.items():
        android_key = convert_key_name(key)
        converted_messages[android_key] = value
    
    # 定义功能组及其对应的键前缀和详细注释
    # 注意：前缀匹配现在基于转换后的键名（下划线格式）
    function_groups = {
        'app_config': {
            'prefixes': ['app_title'],
            'comment': '===============================================\nAPPLICATION CONFIGURATION\n===============================================\nApplication name and basic configuration settings\nUsed in AndroidManifest.xml and main app interface'
        },
        'navigation': {
            'prefixes': ['nav_'],
            'comment': '===============================================\nNAVIGATION & MENU SYSTEM\n===============================================\nMain navigation menu items and navigation labels\nBottom navigation, drawer menu, and tab navigation'
        },
        'inventory': {
            'prefixes': ['inventory_'],
            'comment': '===============================================\nINVENTORY MANAGEMENT CORE\n===============================================\nCore inventory operations and data display\nMain inventory list, search, and filtering functionality'
        },
        'item_operations': {
            'prefixes': ['add_'],
            'comment': '===============================================\nITEM OPERATIONS & MANAGEMENT\n===============================================\nAdd, edit, and manage individual inventory items\nForm labels and validation messages for item operations'
        },
        'status_management': {
            'prefixes': ['status_'],
            'comment': '===============================================\nSTATUS INDICATORS & STATES\n===============================================\nItem status indicators, state badges, and condition labels\nUsed for inventory status visualization and filtering'
        },
        'notifications': {
            'prefixes': ['notifications_'],
            'comment': '===============================================\nSYSTEM NOTIFICATIONS & MESSAGES\n===============================================\nSystem notifications, user feedback messages, and alerts\nToast messages, dialog titles, and notification content'
        },
        'categories': {
            'prefixes': ['categories_'],
            'comment': '===============================================\nITEM CATEGORIES & CLASSIFICATION\n===============================================\nInventory item classification categories and labels\nUsed for item categorization and filtering in inventory'
        },
        'ai_features': {
            'prefixes': ['ai_record_'],
            'comment': '===============================================\nAI FEATURES & RECORDS\n===============================================\nArtificial intelligence record generation and processing\nAI-related UI labels and functionality descriptions'
        },
        'shopping_list': {
            'prefixes': ['purchase_list_'],
            'comment': '===============================================\nSHOPPING LIST & PURCHASE MANAGEMENT\n===============================================\nPurchase recommendations, restock suggestions, and shopping list items\nSmart purchasing suggestions based on inventory levels'
        },
        'statistics': {
            'prefixes': ['stats_'],
            'comment': '===============================================\nSTATISTICS & ANALYTICS\n===============================================\nInventory statistics, reporting labels, and analytical data\nDashboard metrics and data visualization labels'
        }
    }
    
    # 为每个功能组生成资源
    for group_name, group_info in function_groups.items():
        # 收集该组的所有键
        group_keys = []
        for prefix in group_info['prefixes']:
            for key in converted_messages.keys():
                if key.startswith(prefix) and key not in group_keys:
                    group_keys.append(key)
        
        # 如果该组有键，才添加注释和内容
        if group_keys:
            # 添加组注释
            comment_lines = group_info['comment'].split('\n')
            for comment_line in comment_lines:
                android_resources.append(f'    <!-- {comment_line} -->')
            android_resources.append('')
            
            # 按键名排序并生成资源
            for key in sorted(group_keys):
                value = escape_android_string(converted_messages[key])
                android_resources.append(f'    <string name="{key}">{value}</string>')
            
            android_resources.append('')
    
    # 添加未分类的键（如果有的话）
    categorized_keys = set()
    for group_info in function_groups.values():
        for prefix in group_info['prefixes']:
            for key in converted_messages.keys():
                if key.startswith(prefix):
                    categorized_keys.add(key)
    
    uncategorized_keys = set(converted_messages.keys()) - categorized_keys
    if uncategorized_keys:
        android_resources.append('    <!-- =========================================== -->')
        android_resources.append('    <!-- UNCLASSIFIED / REMAINING KEYS -->')
        android_resources.append('    <!-- Keys that do not fit into predefined groups -->')
        android_resources.append('    <!-- =========================================== -->')
        for key in sorted(uncategorized_keys):
            value = escape_android_string(converted_messages[key])
            android_resources.append(f'    <string name="{key}">{value}</string>')
        android_resources.append('')
    
    android_resources.append('</resources>')
    return '\n'.join(android_resources)

def main():
    """主函数：转换所有语言文件"""
    
    # 语言文件目录
    locales_dir = Path("backend/inventory-api/src/static/locales")
    android_res_dir = Path("android/app/src/main/res")
    
    # 确保输出目录存在
    android_res_dir.mkdir(parents=True, exist_ok=True)
    
    # 扫描所有语言文件
    js_files = list(locales_dir.glob("*.js"))
    
    if not js_files:
        print(f"在目录 {locales_dir} 中未找到语言文件")
        return
    
    print(f"找到 {len(js_files)} 个语言文件")
    
    success_count = 0
    failed_count = 0
    
    for js_file in js_files:
        try:
            # 读取JavaScript文件
            with open(js_file, 'r', encoding='utf-8') as f:
                js_content = f.read()
            
            # 提取消息
            messages = extract_messages_from_js(js_content)
            
            if messages is None:
                print(f"无法从 {js_file.name} 提取消息")
                failed_count += 1
                continue
            
            # 平铺字典
            flat_messages = flatten_dict(messages)
            
            # 获取语言代码
            lang_code = js_file.stem  # 文件名作为语言代码
            
            # 生成Android资源
            resource_content = generate_android_resources(flat_messages, lang_code)
            
            # 确定输出路径 - 修复语言文件夹命名规则
            if lang_code == "en":
                # 英语放在默认的values文件夹下
                output_dir = android_res_dir / "values"
                output_file = output_dir / "strings.xml"
            elif lang_code == "zh-CN":
                # 简体中文
                output_dir = android_res_dir / "values-zh"
                output_file = output_dir / "strings.xml"
            elif lang_code == "zh-TW":
                # 繁体中文
                output_dir = android_res_dir / "values-zh-rTW"
                output_file = output_dir / "strings.xml"
            else:
                # 其他语言使用values-xx格式
                output_dir = android_res_dir / f"values-{lang_code}"
                output_file = output_dir / "strings.xml"
            
            # 确保目录存在
            output_dir.mkdir(parents=True, exist_ok=True)
            
            # 写入文件
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(resource_content)
            
            print(f"✓ 成功生成 {lang_code} 语言文件: {output_file}")
            success_count += 1
            
        except Exception as e:
            print(f"✗ 处理 {js_file.name} 时出错: {e}")
            failed_count += 1
    
    print(f"\n转换完成: 成功 {success_count}, 失败 {failed_count}")
    if failed_count == 0:
        print("所有语言文件转换成功！")
    else:
        print("部分语言文件转换失败，请检查错误信息。")

if __name__ == "__main__":
    main()