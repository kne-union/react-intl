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

/** @type {readonly ['remote-first', 'local-first', 'off']} */
export const LOCALE_MESSAGE_STRATEGIES = ['remote-first', 'local-first', 'off'];

/**
 * 从 apis.localeMessage 解析加载策略。
 * 未配置 / 非法值 → local-first（兼容现网）
 */
export const resolveLocaleMessageStrategy = localeMessageApi => {
  if (!localeMessageApi || typeof localeMessageApi !== 'object') {
    return 'local-first';
  }
  const strategy = localeMessageApi.strategy;
  if (typeof strategy !== 'string') {
    return 'local-first';
  }
  return LOCALE_MESSAGE_STRATEGIES.includes(strategy) ? strategy : 'local-first';
};

/**
 * 是否发起远程语言包请求。
 * - remote-first：有 API 即请求
 * - local-first：有 API 且本地无当前语言包，且有默认语言包
 * - off：永不请求
 */
export const shouldFetchLocaleMessage = ({ strategy, hasApi, hasLocal, hasDefaultLocal } = {}) => {
  if (!hasApi) {
    return false;
  }
  if (strategy === 'off') {
    return false;
  }
  if (strategy === 'remote-first') {
    return true;
  }
  // local-first（默认）
  return !hasLocal && !!hasDefaultLocal;
};
