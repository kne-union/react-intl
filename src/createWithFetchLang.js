import Fetch from '@kne/react-fetch';
import { useGlobalValue, usePreset } from '@kne/global-context';
import localeLoader, { messagesLoader, message } from './loader';
import { IntlProvider, IntlContext } from 'react-intl';
import React, { forwardRef, useContext } from 'react';
import { Provider as MessageProvider, useContext as useMessageContext } from './contex';
import { argsParse, resolveLocale, mergeIntlMessages, hasMessages, resolveLocaleMessageStrategy, shouldFetchLocaleMessage } from './intlUtils';

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

/**
 * 组装 localeMessage 请求参数。
 * - GET：locale/namespace 放入 params（query）
 * - 非 GET：放入 data（body）
 * - loader 场景同时保留 data，与文档示例 `loader: ({ data }) =>` 兼容
 * - 失败不弹 toast（showError: false）
 * 响应须为扁平文案对象 `{ [messageId]: string }`（经 transformResponse 后的 results）
 */
const buildLocaleMessageFetchProps = (fetchApi, { locale, namespace }) => {
  const requestPayload = { locale, namespace };
  const method = String(fetchApi.method || 'GET').toUpperCase();
  const next = Object.assign({}, fetchApi, {
    method: fetchApi.method || (fetchApi.url ? 'GET' : fetchApi.method),
    data: Object.assign({}, fetchApi.data, requestPayload),
    // axios-fetch：config.showError === false 时不走 errorHandler
    showError: false,
    options: Object.assign({}, fetchApi.options, { showError: false })
  });
  if (method === 'GET') {
    next.params = Object.assign({}, fetchApi.params, requestPayload);
  }
  return next;
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
      const localeMessageApi = apis?.localeMessage;
      const strategy = resolveLocaleMessageStrategy(localeMessageApi);
      const needsRemoteFetch = shouldFetchLocaleMessage({
        strategy,
        hasApi: !!localeMessageApi,
        hasLocal: hasMessages(namespaceMessages),
        hasDefaultLocal: hasMessages(defaultLocalMessage)
      });

      if (needsRemoteFetch) {
        // 剥离 strategy，避免传入 Fetch
        const { strategy: _strategy, ...fetchApi } = localeMessageApi;
        const localFallback = hasMessages(namespaceMessages) ? namespaceMessages : defaultLocalMessage;

        const renderWithRemoteData = remoteData => {
          // remote-first：远程覆盖本地同名字段；远程空则回退本地
          const loadedMessages = strategy === 'remote-first' ? mergeIntlMessages(localFallback, hasMessages(remoteData) ? remoteData : {}) : hasMessages(remoteData) ? remoteData : localFallback;
          if (hasMessages(loadedMessages)) {
            messagesLoader({ [locale]: loadedMessages }, currentNamespace);
          }
          const resolvedMessages = message[locale]?.[currentNamespace] || localFallback;
          return renderIntlTree({
            locale,
            prevMessage,
            namespaceMessages: resolvedMessages,
            WrappedComponents,
            props,
            ref,
            MessageProvider
          });
        };

        return (
          <Fetch
            {...buildLocaleMessageFetchProps(fetchApi, { locale, namespace: currentNamespace })}
            cache="intl-fetch-lang"
            // 接口失败：不展示错误态，静默回退本地语言包
            error={() => renderWithRemoteData(null)}
            render={({ data }) => renderWithRemoteData(data)}
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
