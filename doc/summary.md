### 项目概述

react-intl是一个基于[react-intl](https://formatjs.io/docs/react-intl/)的React国际化封装组件库，提供了更简便的API和更灵活的使用方式，帮助开发者快速实现React应用的国际化功能。

### 主要特性

- **简化的API**：对react-intl进行封装，提供更简洁的API
- **命名空间支持**：支持通过命名空间组织和管理国际化消息
- **上下文集成**：与@kne/global-context集成，支持通过上下文获取locale信息
- **灵活的Provider创建**：提供createIntlProvider和createWithIntlProvider方法创建定制化的国际化Provider
- **消息加载器**：提供localeLoader用于加载和管理国际化消息

### 安装

```bash
npm install @kne/react-intl
```

### 基本使用

#### 创建国际化Provider

```jsx
import {createIntlProvider} from '@kne/react-intl';

const IntlProvider = createIntlProvider({
  locale: 'zh-CN',
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

// 在应用根组件中使用
const App = () => {
  return (
    <IntlProvider>
      <YourApp />
    </IntlProvider>
  );
};
```

#### 使用国际化消息

```jsx
import {FormattedMessage, useIntl} from '@kne/react-intl';

// 使用FormattedMessage组件
const HelloComponent = () => {
  return <FormattedMessage id="hello" />;
};

// 使用useIntl hook
const HelloFunctionComponent = () => {
  const intl = useIntl();
  return <div>{intl.formatMessage({id: 'hello'})}</div>;
};
```

#### 加载国际化消息

```jsx
import {localeLoader} from '@kne/react-intl';

// 加载中文消息
localeLoader('zh-CN', {
  welcome: '欢迎使用我们的应用'
}, 'app');

// 加载英文消息
localeLoader('en-US', {
  welcome: 'Welcome to our application'
}, 'app');
```

### 与@kne/global-context集成

```jsx
import {createIntl} from '@kne/react-intl';
import {createGlobalContext} from '@kne/global-context';

const {useGlobalContext, GlobalContextProvider} = createGlobalContext();

const {IntlProvider, useIntl, FormattedMessage} = createIntl({
  getLocale: () => {
    const [globalContext] = useGlobalContext();
    return globalContext.locale;
  }
});

// 在应用中使用
const App = () => {
  return (
    <GlobalContextProvider value={{locale: 'zh-CN'}}>
      <IntlProvider>
        <YourApp />
      </IntlProvider>
    </GlobalContextProvider>
  );
};
```
