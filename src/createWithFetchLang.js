import Fetch from '@kne/react-fetch';
import { useGlobalValue, usePreset } from '@kne/global-context';
import localeLoader, { messagesLoader, message } from './loader';
import { IntlProvider, IntlContext } from 'react-intl';
import React, { forwardRef, useContext } from 'react';
import { Provider as MessageProvider, useContext as useMessageContext } from './contex';
import { argsParse, resolveLocale, mergeIntlMessages, hasMessages } from './intlUtils';

const renderIntlTree = ({ locale, prevMessage, namespaceMessages, WrappedComponents, props, ref, MessageProvider: MsgProvider }) => {
  const currentMessage = mergeIntlMessages(prevMessage, namespaceMessages);
  return (
    <IntlProvider messages={currentMessage} locale={locale}>
      <MsgProvider value={currentMessage}>
        <WrappedComponents {...props} ref={ref} />
      </MsgProvider>
    </IntlProvider>
  );
};

const createWithFetchLang = (...args) => {
  const { defaultLocale, defaultMessage, namespace, messages: configMessages } = argsParse(...args);
  defaultMessage && localeLoader(defaultLocale, defaultMessage, namespace);
  configMessages && messagesLoader(configMessages, namespace);

  return WrappedComponents =>
    forwardRef(({ locale: propsLocale, ...props }, ref) => {
      const { apis } = usePreset();
      const contextLocal = useGlobalValue('locale');
      const parentIntl = useContext(IntlContext);
      const prevMessage = useMessageContext();
      const locale = resolveLocale({
        propsLocale,
        contextLocal,
        parentIntlLocale: parentIntl?.locale,
        defaultLocale
      });
      const currentNamespace = namespace || 'global';
      const namespaceMessages = message[locale]?.[currentNamespace];
      const defaultLocalMessage = message[defaultLocale || 'zh-CN']?.[currentNamespace];
      const needsRemoteFetch = apis?.localeMessage && !hasMessages(namespaceMessages) && hasMessages(defaultLocalMessage);

      if (needsRemoteFetch) {
        return (
          <Fetch
            {...Object.assign({}, apis.localeMessage, {
              data: { locale, namespace: currentNamespace, defaultLang: defaultLocalMessage }
            })}
            cache="intl-fetch-lang"
            render={({ data }) => {
              const loadedMessages = hasMessages(data) ? data : defaultLocalMessage;
              messagesLoader({ [locale]: loadedMessages }, currentNamespace);
              const resolvedMessages = message[locale]?.[currentNamespace] || defaultLocalMessage;
              return renderIntlTree({
                locale,
                prevMessage,
                namespaceMessages: resolvedMessages,
                WrappedComponents,
                props,
                ref,
                MessageProvider
              });
            }}
          />
        );
      }

      return renderIntlTree({
        locale,
        prevMessage,
        namespaceMessages,
        WrappedComponents,
        props,
        ref,
        MessageProvider
      });
    });
};

export default createWithFetchLang;
