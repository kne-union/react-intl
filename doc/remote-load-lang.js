const { createIntlProvider, FormattedMessage } = _ReactIntl;
const { Select, Flex } = antd;
const { useState } = React;
const { createWithRemoteLoader } = remoteLoader;

const IntlProvider = createIntlProvider({
  defaultLocale: 'zh-CN',
  namespace: 'test',
  messages: {
    'zh-CN': {
      hello: '你好，世界！',
      remove: '删除'
    },
    'en-US': {
      hello: 'Hello, world!',
      remove: 'remove'
    }
  }
});

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal']
})(({ remoteModules }) => {
  const [PureGlobal] = remoteModules;
  const [locale, setLocale] = useState('zh-CN');
  return (
    <PureGlobal
      preset={{
        apis: {
          localeMessage: {
            // local-first（默认）：本地无当前语言包时才请求
            // remote-first：始终请求远程，远程覆盖本地同名字段
            // off：不请求远程
            // url 模式响应须为扁平 { [id]: text }，例如：
            // url: '/api/v1/intl-admin/lang-lib/messages',
            // method: 'GET',
            strategy: 'local-first',
            loader: ({ data }) => {
              console.log('params', data);
              const lang = {
                'ja-JP': {
                  hello: 'こんにちは、世界！'
                },
                'de-DE': {
                  hello: 'Hallo, Welt!'
                }
              };

              return Promise.resolve(lang[data.locale]);
            }
          }
        }
      }}
    >
      <IntlProvider locale={locale}>
        <Flex gap={10}>
          <Select
            placeholder="请选择语言"
            value={locale}
            onChange={setLocale}
            options={[
              { value: 'zh-CN', label: '中文' },
              { value: 'en-US', label: 'English' },
              { value: 'ja-JP', label: '日本語' },
              { value: 'de-DE', label: 'Deutsch' }
            ]}
          />
          <FormattedMessage id="hello" />
        </Flex>
      </IntlProvider>
    </PureGlobal>
  );
});

render(<BaseExample />);
