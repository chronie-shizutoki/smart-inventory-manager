# 国际化翻译字典

translations = {
    'zh': {
        'alerts': {
            'expired': '物品已过期',
            'expiringSoon': '即将过期',
            'lowStock': '库存不足',
            'expiredMessage': '{item} 已过期 {days} 天',
            'expiringSoonMessage': '{item} 将在 {days} 天后过期',
            'lowStockMessage': '{item} 库存仅剩 {quantity} {unit}'
        },
        'recommendations': {
            'restock': '建议补充 {item}',
            'watch': '建议关注 {item}',
            'consider': '考虑补充 {item}',
            'restockReason': '当前库存 {quantity} {unit}，低于最低库存 {minQuantity} {unit}',
            'freqUseReason': '近30天内使用 {count} 次，当前库存 {quantity} {unit}，建议及时补充',
            'categoryReason': '作为 {category} 分类中常用物品，近30天内使用 {count} 次'
        }
    },
    'en': {
        'alerts': {
            'expired': 'Item Expired',
            'expiringSoon': 'Expiring Soon',
            'lowStock': 'Low Stock',
            'expiredMessage': '{item} has expired for {days} days',
            'expiringSoonMessage': '{item} will expire in {days} days',
            'lowStockMessage': '{item} has only {quantity} {unit} left'
        },
        'recommendations': {
            'restock': 'Recommend replenishing {item}',
            'watch': 'Recommend watching {item}',
            'consider': 'Consider replenishing {item}',
            'restockReason': 'Current stock {quantity} {unit}, below minimum stock {minQuantity} {unit}',
            'freqUseReason': 'Used {count} times in the last 30 days, current stock {quantity} {unit}, recommend replenishing',
            'categoryReason': 'As a commonly used item in the {category} category, used {count} times in the last 30 days'
        }
    },
    'ja': {
        'alerts': {
            'expired': 'アイテムの有効期限切れ',
            'expiringSoon': '期限切れ間近',
            'lowStock': '在庫不足',
            'expiredMessage': '{item} の有効期限が {days} 日切れています',
            'expiringSoonMessage': '{item} の有効期限が {days} 日以内に切れます',
            'lowStockMessage': '{item} の在庫は {quantity} {unit} のみ残っています'
        },
        'recommendations': {
            'restock': '{item} の補充を推奨',
            'watch': '{item} に注意することを推奨',
            'consider': '{item} の補充を検討',
            'restockReason': '現在の在庫 {quantity} {unit}、最小在庫 {minQuantity} {unit} を下回っています',
            'freqUseReason': '過去30日間に {count} 回使用され、現在の在庫 {quantity} {unit}、補充を推奨',
            'categoryReason': '{category} カテゴリでよく使用されるアイテムとして、過去30日間に {count} 回使用されました'
        }
    }
}

def get_translation(language, section, key, **kwargs):
    """
    获取翻译文本
    :param language: 语言代码
    :param section: 部分（alerts或recommendations）
    :param key: 键名
    :param kwargs: 格式化参数
    :return: 翻译后的文本
    """
    try:
        # 如果指定语言不存在，默认使用英语
        lang = language if language in translations else 'en'
        text = translations[lang][section][key]
        # 格式化文本
        return text.format(**kwargs)
    except (KeyError, ValueError):
        # 如果找不到翻译，返回键名
        return key