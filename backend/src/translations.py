# 国际化翻译字典
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