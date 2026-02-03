# Internationalization translation dictionary
def get_translation(language, section, key, **kwargs):
    """
    Get the translation text
    :param language: Language code
    :param section: Section (alerts or recommendations)
    :param key: Key name
    :param kwargs: Formatting parameters
    :return: Translated text
    """
    try:
        # If the specified language does not exist, use English by default
        lang = language if language in translations else 'en'
        text = translations[lang][section][key]
        # Format the text
        return text.format(**kwargs)
    except (KeyError, ValueError):
        # If the translation is not found, return the key name
        return key