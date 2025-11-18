#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from PIL import Image, ImageDraw
import os

# 原始favicon路径
favicon_path = "d:\\chronie-app\\smart-inventory-manager\\android\\app\\src\\main\\res\\drawable\\favicon.png"

# 加载原始favicon
original_favicon = Image.open(favicon_path)
print(f"原始favicon尺寸: {original_favicon.size}")
print(f"原始favicon模式: {original_favicon.mode}")

# mipmap目录映射和对应图标尺寸
mipmap_dirs = {
    'mipmap-mdpi': 48,
    'mipmap-hdpi': 72, 
    'mipmap-xhdpi': 96,
    'mipmap-xxhdpi': 144,
    'mipmap-xxxhdpi': 192,
    'mipmap-anydpi': 512
}

# 为每个mipmap目录生成图标
for mipmap_dir, icon_size in mipmap_dirs.items():
    print(f"\n=== 生成 {mipmap_dir} ({icon_size}x{icon_size}) ===")
    
    # 创建带背景的新图标
    icon = Image.new('RGBA', (icon_size, icon_size), (255, 255, 255, 255))  # 白色背景
    
    # 计算50%安全区域 - 只使用中心50%的区域
    safe_zone_size = int(icon_size * 0.5)  # 50%安全区域
    safe_zone_x = (icon_size - safe_zone_size) // 2
    safe_zone_y = (icon_size - safe_zone_size) // 2
    
    # 缩放favicon到安全区域大小
    favicon_resized = original_favicon.resize((safe_zone_size, safe_zone_size), Image.Resampling.LANCZOS)
    
    # 如果favicon是调色板模式，转换为RGBA
    if favicon_resized.mode == 'P':
        favicon_rgba = favicon_resized.convert('RGBA')
    else:
        favicon_rgba = favicon_resized
    
    # 将缩放后的favicon粘贴到安全区域中心
    icon.paste(favicon_rgba, (safe_zone_x, safe_zone_y), favicon_rgba)
    
    # 保存为ic_launcher.png
    icon_path = f"d:\\chronie-app\\smart-inventory-manager\\android\\app\\src\\main\\res\\{mipmap_dir}\\ic_launcher.png"
    icon.save(icon_path, 'PNG')
    print(f"✓ 生成: {icon_path}")
    
    # 生成圆形版本 - ic_launcher_round.png
    # 创建圆形蒙版
    mask = Image.new('L', (icon_size, icon_size), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, icon_size, icon_size), fill=255)
    
    # 应用圆形蒙版
    icon_round = icon.copy()
    icon_round.putalpha(mask)
    
    # 保存圆形版本
    round_path = f"d:\\chronie-app\\smart-inventory-manager\\android\\app\\src\\main\\res\\{mipmap_dir}\\ic_launcher_round.png"
    icon_round.save(round_path, 'PNG')
    print(f"✓ 生成: {round_path}")

print(f"\n=== 完成！所有图标已生成，使用原始favicon并添加50%安全区域限制 ===")