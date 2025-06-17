
# react-intl


### 描述

快捷地创建国际化中需要使用到的组件


### 安装

```shell
npm i --save @kne/react-intl
```


### 概述

@kne/react-intl是一个基于[react-intl](https://formatjs.io/docs/react-intl/)的React国际化封装组件库，提供了更简便的API和更灵活的使用方式。它与@kne/global-context深度集成，支持从上下文获取语言设置，并提供了命名空间支持，使得国际化资源的管理更加方便。

### 主要特性

- **简化的API**：封装react-intl，提供更简洁直观的API
- **命名空间支持**：支持通过命名空间隔离和组织国际化消息
- **上下文集成**：与@kne/global-context无缝集成，支持从上下文获取locale
- **灵活的Provider**：支持多种方式创建和使用国际化Provider
- **动态消息加载**：支持运行时动态加载和更新国际化消息
- **函数式组件支持**：支持将intl实例作为render props传递

### 安装

```bash
npm install @kne/react-intl
```

### 基本使用

#### 1. 使用createIntlProvider创建Provider

```jsx
import {createIntlProvider} from '@kne/react-intl';

// 方式1：使用对象配置
const IntlProvider = createIntlProvider({
  defaultLocale: 'zh-CN',
  messages: {
    'zh-CN': {
      hello: '你好，世界！'
    },
    'en-US': {
      hello: 'Hello, world!'
    }
  },
  namespace: 'app'
});

// 方式2：使用参数配置
const IntlProvider = createIntlProvider('zh-CN', {
  hello: '你好，世界！'
}, 'app');

// 在应用中使用
const App = () => (
  <IntlProvider>
    <YourApp />
  </IntlProvider>
);

// 使用render props获取intl实例
const App = () => (
  <IntlProvider>
    {(intl) => (
      <div>{intl.formatMessage({id: 'hello'})}</div>
    )}
  </IntlProvider>
);
```

#### 2. 使用createWithIntlProvider创建高阶组件

```jsx
import {createWithIntlProvider} from '@kne/react-intl';

const withIntl = createWithIntlProvider({
  defaultLocale: 'zh-CN',
  defaultMessage: {
    hello: '你好，世界！'
  },
  namespace: 'app'
});

// 包装组件
const WrappedComponent = withIntl(YourComponent);
```

#### 3. 动态加载国际化消息

```jsx
import {localeLoader, messagesLoader} from '@kne/react-intl';

// 加载单个语言的消息
localeLoader('zh-CN', {
  welcome: '欢迎使用'
}, 'app');

// 批量加载多个语言的消息
messagesLoader({
  'zh-CN': {
    welcome: '欢迎使用'
  },
  'en-US': {
    welcome: 'Welcome'
  }
}, 'app');
```

#### 4. 与@kne/global-context集成

```jsx
import {createIntlProvider} from '@kne/react-intl';
import {createContext} from '@kne/global-context';

const {useContext, ContextProvider} = createContext();

const IntlProvider = createIntlProvider({
  defaultLocale: 'zh-CN',
  messages: {
    'zh-CN': {
      hello: '你好'
    }
  }
});

// locale将从context中获取
const App = () => (
  <ContextProvider value={{locale: 'zh-CN'}}>
    <IntlProvider>
      <YourApp />
    </IntlProvider>
  </ContextProvider>
);
```

### 最佳实践

1. **使用命名空间**：
   - 为不同模块使用不同的命名空间，避免消息键冲突
   - 保持命名空间结构清晰，便于管理

2. **动态加载**：
   - 按需加载国际化消息，减少初始加载大小
   - 使用messagesLoader批量加载相关消息

3. **上下文集成**：
   - 优先使用上下文管理locale
   - 在需要时才通过props覆盖locale

4. **消息组织**：
   - 使用有意义的消息键
   - 保持消息结构扁平化
   - 适当使用消息格式化功能


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
- _ReactIntl(@kne/current-lib_react-intl)[import * as _ReactIntl from "@kne/react-intl"],antd(antd)

```jsx
const { createIntlProvider, FormattedMessage } = _ReactIntl;
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
      </Flex>
    </IntlProvider>
  );
};

render(<BaseExample />);

```


### API

本文档详细介绍了@kne/react-intl提供的API，包括函数、组件和钩子。

### 核心API

#### createIntl

创建国际化相关的组件和hooks，可以自定义获取locale的方法。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| options | Object | 否 | {} | 配置选项 |
| options.getLocale | Function | 否 | 从context获取 | 自定义获取locale的函数 |

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
import {createContext} from '@kne/global-context';

const {useContext} = createContext();

const {IntlProvider, useIntl, FormattedMessage} = createIntl({
  getLocale: () => {
    const [context] = useContext();
    return context.locale;
  }
});
```

#### createIntlProvider

创建国际化Provider组件，支持多种调用方式。

**方式1：使用对象配置**

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| options | Object | 是 | - | Provider的配置选项 |
| options.locale | String | 否 | 从context获取 | 当前语言 |
| options.defaultLocale | String | 否 | 'zh-CN' | 默认语言 |
| options.messages | Object | 否 | {} | 国际化消息对象 |
| options.namespace | String | 否 | 'global' | 命名空间 |

**方式2：使用参数配置**

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| locale | String | 是 | - | 当前语言 |
| messages | Object | 是 | - | 国际化消息对象 |
| namespace | String | 否 | 'global' | 命名空间 |

**返回值**：

| 类型 | 描述 |
|------|------|
| Component | 国际化Provider组件，支持render props获取intl实例 |

**示例**：

```jsx
// 方式1：使用对象配置
import {createIntlProvider} from '@kne/react-intl';

const IntlProvider = createIntlProvider({
  defaultLocale: 'zh-CN',
  messages: {
    'zh-CN': {
      hello: '你好，世界！'
    },
    'en-US': {
      hello: 'Hello, world!'
    }
  },
  namespace: 'app'
});

// 方式2：使用参数配置
const IntlProvider = createIntlProvider('zh-CN', {
  hello: '你好，世界！'
}, 'app');

// 在应用中使用
const App = () => (
  <IntlProvider>
    <YourApp />
  </IntlProvider>
);

// 使用render props获取intl实例
const App = () => (
  <IntlProvider>
    {(intl) => (
      <div>{intl.formatMessage({id: 'hello'})}</div>
    )}
  </IntlProvider>
);
```

#### createWithIntlProvider

创建一个高阶组件，用于包装组件并提供国际化功能。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| options | Object | 是 | - | Provider的配置选项 |
| options.locale | String | 否 | 从context获取 | 当前语言 |
| options.defaultLocale | String | 否 | 'zh-CN' | 默认语言 |
| options.defaultMessage | Object | 否 | {} | 默认消息对象 |
| options.namespace | String | 否 | 'global' | 命名空间 |

**返回值**：

| 类型 | 描述 |
|------|------|
| Function | 高阶组件函数，接收一个组件并返回包装后的组件 |

**示例**：

```jsx
import {createWithIntlProvider} from '@kne/react-intl';

const withIntl = createWithIntlProvider({
  defaultLocale: 'zh-CN',
  defaultMessage: {
    hello: '你好，世界！'
  },
  namespace: 'app'
});

// 包装组件
const WrappedComponent = withIntl(YourComponent);

// 使用包装后的组件
const App = () => <WrappedComponent />;
```

#### localeLoader

加载单个语言的国际化消息。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| locale | String | 是 | - | 语言代码 |
| localeMessage | Object | 是 | - | 消息对象 |
| namespace | String | 否 | 'global' | 命名空间 |

**返回值**：

| 类型 | 描述 |
|------|------|
| Object | 更新后的完整消息对象 |

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

#### messagesLoader

批量加载多语言的国际化消息。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| messages | Object | 是 | - | 多语言消息对象，格式为 {locale: messages} |
| namespace | String | 否 | 'global' | 命名空间 |

**返回值**：无

**示例**：

```jsx
import {messagesLoader} from '@kne/react-intl';

// 批量加载多语言消息
messagesLoader({
  'zh-CN': {
    welcome: '欢迎使用',
    goodbye: '再见'
  },
  'en-US': {
    welcome: 'Welcome',
    goodbye: 'Goodbye'
  }
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

### 内部API

#### message

存储所有已加载的国际化消息的对象。

**结构**：

```javascript
{
  [locale: string]: {
    [namespace: string]: {
      [messageId: string]: string
    }
  }
}
```

**示例**：

```javascript
// 内部结构示例
{
  'zh-CN': {
    'global': {
      'hello': '你好'
    },
    'app': {
      'welcome': '欢迎使用'
    }
  },
  'en-US': {
    'global': {
      'hello': 'Hello'
    },
    'app': {
      'welcome': 'Welcome'
    }
  }
}
```

**注意**：此对象通常不需要直接访问，应通过提供的API函数进行操作。
###
