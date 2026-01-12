const { createIntlProvider, FormattedMessage, createWithIntlProvider } = _ReactIntl;
const { Select, Flex } = antd;
const { useState } = React;

const IntlProvider = createIntlProvider({
  defaultLocale: 'zh-CN',
  messages: {
    'zh-CN': {
      hello: '你好，世界！'
    },
    'en-US': {
      hello: 'Hello, world!'
    }
  }
});

const ChildrenComponent = createWithIntlProvider({
  defaultLocale: 'zh-CN',
  messages: {
    'zh-CN': {
      childrenMessage: '我是子组件显示信息'
    },
    'en-US': {
      childrenMessage: 'I am the child component displaying information.'
    }
  }
})(() => {
  return (
    <>
      <FormattedMessage id="childrenMessage" />&<FormattedMessage id="hello" />
    </>
  );
});

const BaseExample = () => {
  const [locale, setLocale] = useState('zh-CN');
  return (
    <IntlProvider locale={locale}>
      <Flex gap={10}>
        <Select
          placeholder="请选择语言"
          value={locale}
          onChange={setLocale}
          options={[
            { value: 'zh-CN', label: '中文' },
            { value: 'en-US', label: 'English' }
          ]}
        />
        <FormattedMessage id="hello" />
        <div>----------------</div>
        <ChildrenComponent locale={locale} />
      </Flex>
    </IntlProvider>
  );
};

render(<BaseExample />);
