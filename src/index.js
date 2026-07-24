import React from 'react';
import localeLoader, { message } from './loader';
import { IntlProvider, createIntl as createIntlBase, useIntl } from 'react-intl';
import createWithFetchLang from './createWithFetchLang';
import { hasMessages } from './intlUtils';

export const createIntlProvider = (...args) => {
  const IntlProviderComponent = createWithFetchLang(...args);
  const InnerComponent = ({ children }) => {
    const intl = useIntl();
    return children(intl);
  };
  return IntlProviderComponent(({ locale: propsLocale, children }) => {
    return typeof children === 'function' ? <InnerComponent>{children}</InnerComponent> : children;
  });
};

export const createWithIntlProvider = createWithFetchLang;

export * from 'react-intl';

export const createIntl = ({ locale = 'zh-CN', message: propsMessage, namespace }) => {
  propsMessage && localeLoader(locale, propsMessage, namespace);
  const namespaceMessages = message[locale]?.[namespace || 'global'];
  return createIntlBase({ locale, messages: hasMessages(namespaceMessages) ? namespaceMessages : {} });
};

export { localeLoader, IntlProvider };
export { resolveLocaleMessageStrategy, shouldFetchLocaleMessage, LOCALE_MESSAGE_STRATEGIES } from './intlUtils';

export default createIntl;
