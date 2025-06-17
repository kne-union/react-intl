
# react-intl


### 描述

快捷地创建国际化中需要使用到的组件


### 安装

```shell
npm i --save @kne/react-intl
```


### 概述

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


### 示例


#### 示例样式

```scss
.ant-card {
  border-color: black;
  text-align: center;
  width: 200px;
}
```

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _CreateIntl(@kne/current-lib_create-intl)[import * as _CreateIntl from "@kne/create-intl"]

```jsx
const {default:CreateIntl} = _CreateIntl;

const BaseExample = ()=>{
    return <div>
        <CreateIntl />
    </div>;
};

render(<BaseExample />);

```


### API

### API文档

本文档详细介绍了@kne/react-intl提供的API，包括函数、组件和钩子。

### 核心API

#### createIntl

创建国际化相关的组件和hooks，可以自定义获取locale的方法。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| options | Object | 否 | {} | 配置选项 |
| options.getLocale | Function | 否 | undefined | 自定义获取locale的函数 |

**返回值**：

| 属性 | 类型 | 描述 |
|------|------|------|
| IntlProvider | Component | 国际化Provider组件 |
| useIntl | Hook | 获取intl对象的hook |
| FormattedDate | Component | 格式化日期组件 |
| FormattedTime | Component | 格式化时间组件 |
| FormattedNumber | Component | 格式化数字组件 |
| FormattedPlural | Component | 格式化复数组件 |
| FormattedMessage | Component | 格式化消息组件 |
| FormattedHTMLMessage | Component | 格式化HTML消息组件 |
| FormattedRelativeTime | Component | 格式化相对时间组件 |

**示例**：

```jsx
import {createIntl} from '@kne/react-intl';
import {createGlobalContext} from '@kne/global-context';

const {useGlobalContext} = createGlobalContext();

const {IntlProvider, useIntl, FormattedMessage} = createIntl({
  getLocale: () => {
    const [globalContext] = useGlobalContext();
    return globalContext.locale;
  }
});
```

#### createIntlProvider

创建国际化Provider组件，可以自定义Provider的props。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| options | Object | 否 | {} | Provider的默认props |
| options.locale | String | 否 | 'zh-CN' | 当前语言 |
| options.defaultLocale | String | 否 | 'zh-CN' | 默认语言 |
| options.messages | Object | 否 | {} | 国际化消息对象 |

**返回值**：

| 类型 | 描述 |
|------|------|
| Component | 国际化Provider组件 |

**示例**：

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

// 在应用中使用
const App = () => (
  <IntlProvider>
    <YourApp />
  </IntlProvider>
);
```

#### createWithIntlProvider

创建一个高阶组件，用于包装组件并提供国际化功能。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| options | Object | 否 | {} | Provider的默认props |
| options.locale | String | 否 | 'zh-CN' | 当前语言 |
| options.defaultLocale | String | 否 | 'zh-CN' | 默认语言 |
| options.messages | Object | 否 | {} | 国际化消息对象 |

**返回值**：

| 类型 | 描述 |
|------|------|
| Function | 高阶组件函数 |

**示例**：

```jsx
import {createWithIntlProvider} from '@kne/react-intl';

const withIntlProvider = createWithIntlProvider({
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

// 包装组件
const WrappedComponent = withIntlProvider(YourComponent);
```

#### localeLoader

加载和管理国际化消息的工具函数。

| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| locale | String | 是 | 语言代码 |
| messages | Object | 是 | 消息对象 |
| namespace | String | 否 | 命名空间，用于组织消息 |

**返回值**：无

**示例**：

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

### 从react-intl导出的API

以下API直接从react-intl导出，详细用法请参考[react-intl官方文档](https://formatjs.io/docs/react-intl/)。

| API | 类型 | 描述 |
|-----|------|------|
| IntlProvider | Component | 国际化Provider组件 |
| FormattedDate | Component | 格式化日期组件 |
| FormattedTime | Component | 格式化时间组件 |
| FormattedNumber | Component | 格式化数字组件 |
| FormattedPlural | Component | 格式化复数组件 |
| FormattedMessage | Component | 格式化消息组件 |
| FormattedHTMLMessage | Component | 格式化HTML消息组件 |
| FormattedRelativeTime | Component | 格式化相对时间组件 |
| useIntl | Hook | 获取intl对象的hook |
| injectIntl | HOC | 注入intl对象的高阶组件 |
| defineMessages | Function | 定义消息的辅助函数 |
| createIntl | Function | 创建intl对象的函数 |

