import Fetch from '@kne/react-fetch';
import { useGlobalValue, usePreset } from '@kne/global-context';
import localeLoader, { messagesLoader, message } from './loader';
import { IntlProvider } from 'react-intl';
import React, { forwardRef } from 'react';

const argsParse = (...args) => {
  if (typeof args[0] === 'object' && typeof args[0].defaultLocale === 'string') {
    return Object.assign({}, args[0]);
  }

  return { defaultLocale: args[0], defaultMessage: args[1], namespace: args[2] };
};

const createWithFetchLang = (...args) => {
  const { defaultLocale, defaultMessage, namespace, messages } = argsParse(...args);
  defaultMessage && localeLoader(defaultLocale, defaultMessage, namespace);
  messages && messagesLoader(messages, namespace);
  return WrappedComponents =>
    forwardRef(({ locale: propsLocale, ...props }, ref) => {
      const { apis } = usePreset();
      const contextLocal = useGlobalValue('locale');
      const locale = propsLocale || contextLocal || defaultLocale || 'zh-CN';
      const currentNamespace = namespace || 'global';
      const messages = message[locale]?.[currentNamespace];
      const defaultLocalMessage = message[defaultLocale || 'zh-CN']?.[currentNamespace];
      if (apis?.localeMessage && !(messages && Object.keys(messages).length > 0) && defaultLocalMessage && Object.keys(defaultLocalMessage).length > 0) {
        return (
          <Fetch
            {...Object.assign({}, apis.localeMessage, { data: { locale, namespace: currentNamespace, defaultLang: defaultLocalMessage } })}
            cache="intl-fetch-lang "
            render={({ data }) => {
              messagesLoader({ [locale]: data }, currentNamespace);
              const messages = message[locale]?.[currentNamespace];
              return (
                <IntlProvider messages={messages} locale={locale}>
                  <WrappedComponents {...props} ref={ref} />
                </IntlProvider>
              );
            }}
          />
        );
      }

      return (
        <IntlProvider messages={messages} locale={locale}>
          <WrappedComponents {...props} ref={ref} />
        </IntlProvider>
      );
    });
};

export default createWithFetchLang;
