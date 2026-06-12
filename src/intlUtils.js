export const argsParse = (...args) => {
  if (typeof args[0] === 'object' && args[0] !== null && !Array.isArray(args[0])) {
    const config = { ...args[0] };
    if (typeof config.defaultLocale !== 'string') {
      const messageLocales = config.messages && typeof config.messages === 'object' ? Object.keys(config.messages) : [];
      config.defaultLocale = messageLocales[0] || 'zh-CN';
    }
    return config;
  }

  const defaultLocale = typeof args[0] === 'string' ? args[0] : 'zh-CN';
  return { defaultLocale, defaultMessage: args[1], namespace: args[2] };
};

export const resolveLocale = ({ propsLocale, contextLocal, parentIntlLocale, defaultLocale }) => {
  const fallbackDefault = typeof defaultLocale === 'string' ? defaultLocale : 'zh-CN';
  return propsLocale || contextLocal || parentIntlLocale || fallbackDefault || 'zh-CN';
};

export const mergeIntlMessages = (prevMessage, namespaceMessages) => Object.assign({}, prevMessage, namespaceMessages);

export const hasMessages = value => Boolean(value && typeof value === 'object' && Object.keys(value).length > 0);
