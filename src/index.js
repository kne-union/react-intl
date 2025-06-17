import React, { forwardRef } from 'react';
import localeLoader, { message, messagesLoader } from './loader';
import { IntlProvider, createIntl as createIntlBase, useIntl } from 'react-intl';
import { useContext } from '@kne/global-context';

const withIntlProvider = WrappedComponents =>
  forwardRef(({ locale: propsLocale, namespace, ...props }, ref) => {
    const context = useContext();
    const locale = propsLocale || context?.locale || 'zh-CN';
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
  const { defaultLocale, defaultMessage, namespace, messages } = argsParse(...args);
  defaultMessage && localeLoader(defaultLocale, defaultMessage, namespace);
  messages && messagesLoader(messages, namespace);
  const InnerComponent = ({ children }) => {
    const intl = useIntl();
    return children(intl);
  };
  return ({ locale: propsLocale, children }) => {
    const context = useContext();
    const locale = propsLocale || context?.locale || defaultLocale || 'zh-CN';
    return (
      <IntlProvider messages={message[locale]?.[namespace || 'global']} locale={locale}>
        {typeof children === 'function' ? <InnerComponent>{children}</InnerComponent> : children}
      </IntlProvider>
    );
  };
};

export const createWithIntlProvider = (...args) => {
  const { defaultLocale, defaultMessage, namespace, messages } = argsParse(...args);
  defaultMessage && localeLoader(defaultLocale, defaultMessage, namespace);
  messages && messagesLoader(messages, namespace);
  return WrappedComponents =>
    forwardRef(({ locale: propsLocale, ...props }, ref) => {
      const context = useContext();
      const locale = propsLocale || context?.locale || defaultLocale || 'zh-CN';
      return (
        <IntlProvider messages={message[locale]?.[namespace || 'global']} locale={locale}>
          <WrappedComponents {...props} ref={ref} />
        </IntlProvider>
      );
    });
};

export * from 'react-intl';

export const createIntl = ({ locale = 'zh-CN', message: propsMessage, namespace }) => {
  propsMessage && localeLoader(locale, propsMessage, namespace);
  return createIntlBase({ locale, messages: message[locale]?.[namespace || 'global'] });
};

export { localeLoader, IntlProvider };

export default createIntl;
