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
