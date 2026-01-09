import React, { forwardRef } from 'react';
import localeLoader, { message, messagesLoader } from './loader';
import { IntlProvider, createIntl as createIntlBase, useIntl } from 'react-intl';
import { useGlobalValue } from '@kne/global-context';
import createWithFetchLang from './createWithFetchLang';

const withIntlProvider = WrappedComponents =>
  forwardRef(({ locale: propsLocale, namespace, ...props }, ref) => {
    const contextLocal = useGlobalValue('locale');
    const locale = propsLocale || contextLocal || 'zh-CN';
    return (
      <IntlProvider messages={message[locale]?.[namespace || 'global']} locale={locale}>
        <WrappedComponents {...props} ref={ref} />
      </IntlProvider>
    );
  });

const argsParse = (...args) => {
  if (typeof args[0] === 'object' && typeof args[0].defaultLocale === 'string') {
    return Object.assign({}, args[0]);
  }

  return { defaultLocale: args[0], defaultMessage: args[1], namespace: args[2] };
};

export const createIntlProvider = (...args) => {
  const withIntlProvider = createWithFetchLang(...args);
  const InnerComponent = ({ children }) => {
    const intl = useIntl();
    return children(intl);
  };
  return withIntlProvider(({ locale: propsLocale, children }) => {
    return typeof children === 'function' ? <InnerComponent>{children}</InnerComponent> : children;
  });
};

export const createWithIntlProvider = createWithFetchLang;

export * from 'react-intl';

export const createIntl = ({ locale = 'zh-CN', message: propsMessage, namespace }) => {
  propsMessage && localeLoader(locale, propsMessage, namespace);
  return createIntlBase({ locale, messages: message[locale]?.[namespace || 'global'] });
};

export { localeLoader, IntlProvider };

export default createIntl;
