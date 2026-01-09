
# react-intl


### 描述

快捷地创建国际化中需要使用到的组件


### 安装

```shell
npm i --save @kne/react-intl
```


### 概述

这是一个基于 react-intl 的 React 国际化组件库，提供便捷的国际化解决方案。通过封装 Provider 和工具函数，简化了多语言应用的开发流程，支持灵活的命名空间管理和动态语言切换。

核心特性包括：开箱即用的国际化 Provider 工厂函数、支持命名空间的消息隔离、自动加载和管理翻译消息、与全局上下文集成实现自动语言检测、完整的 TypeScript 类型定义支持。组件库兼容 react-intl 的所有功能，同时提供了更简洁的 API 设计。

适用于需要快速实现国际化功能的 React 应用，特别适合中大型项目的多语言支持，包括电商网站、SaaS 平台、企业后台管理系统等场景。支持组件级和全局级的语言配置，可以根据不同模块独立管理翻译内容。

技术亮点在于提供了多种创建方式，createIntlProvider 用于创建完整的国际化上下文，createWithIntlProvider 可以为单个组件注入国际化能力，createIntl 则适用于非组件环境的国际化场景。消息加载器支持单个和批量加载，命名空间机制确保不同模块的翻译内容互不干扰。

***远程加载语言包***

远程加载语言包功能支持通过 API 动态获取翻译内容，当本地缺少某语言的翻译时自动触发远程请求。提供智能缓存机制，避免重复请求相同的语言包，适用于按需加载、动态扩展语言支持、分包优化等场景。开发者可通过配置全局上下文的 localeMessage 接口，灵活集成后端翻译服务，实现运营人员动态管理翻译内容，无需重新部署应用。

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

- 基础语言切换
- 实现中英文切换功能，通过下拉选择器实时更新页面语言
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

- 远程加载语言
- 支持API远程动态加载语言包，扩展多语言支持至日语和德语
- _ReactIntl(@kne/current-lib_react-intl)[import * as _ReactIntl from "@kne/react-intl"],antd(antd),remoteLoader(@kne/remote-loader)

```jsx
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
      }}>
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

```


### API

### createIntlProvider
创建国际化 Provider 组件，为子组件提供 i18n 上下文。支持配置默认语言、翻译消息和命名空间，返回的 Provider 组件可以动态切换语言。

#### 配置参数
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| args | string \| object \| array | 是 | - | 支持三种格式：(1) 字符串：默认语言标识 (2) 对象：包含 defaultLocale、defaultMessage、namespace、messages (3) 数组：[defaultLocale, defaultMessage, namespace] |

#### Provider 属性
| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| locale | string | 否 | zh-CN | 当前语言标识，优先级高于默认值 |
| children | ReactNode \| function | 是 | - | 子组件或渲染函数，函数形式接收 intl 对象 |

### createWithIntlProvider
创建高阶组件，为被包装组件添加国际化能力。返回的 HOC 函数接受组件并返回带有国际化上下文的组件。

#### 配置参数
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| args | string \| object \| array | 是 | - | 支持三种格式：(1) 字符串：默认语言标识 (2) 对象：包含 defaultLocale、defaultMessage、namespace、messages (3) 数组：[defaultLocale, defaultMessage, namespace] |

#### HOC 返回组件属性
| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| locale | string | 否 | zh-CN | 当前语言标识，优先级高于默认值 |

### createIntl
创建国际化实例，用于在非组件环境中使用 i18n 功能，例如在工具函数、API 调用等场景。

#### 配置参数
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| locale | string | 否 | zh-CN | 语言标识 |
| message | object | 否 | - | 翻译消息对象 |
| namespace | string | 否 | global | 命名空间 |

#### 返回值
| 类型 | 说明 |
|------|------|
| IntlShape | react-intl 的国际化实例对象 |

### localeLoader
加载指定语言的翻译消息到指定命名空间。

#### 方法参数
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| locale | string | 是 | - | 语言标识，如 zh-CN、en-US |
| defaultMessage | object | 是 | - | 翻译消息对象，key 为消息 ID |
| namespace | string | 否 | global | 命名空间，用于隔离不同模块的翻译 |

#### 返回值
| 类型 | 说明 |
|------|------|
| object | 更新后的消息对象 |

### messagesLoader
批量加载多语言消息对象，支持同时加载多种语言的翻译内容。

#### 方法参数
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| messages | object | 是 | - | 多语言消息对象，key 为语言标识，value 为该语言的翻译消息 |
| namespace | string | 否 | global | 命名空间，用于隔离不同模块的翻译 |

### message
存储所有已加载的翻译消息的容器对象，结构为多层嵌套对象，按语言和命名空间组织。

#### 数据结构
| 层级 | 类型 | 说明 |
|------|------|------|
| 第一层 key | string | 语言标识，如 zh-CN、en-US |
| 第二层 key | string | 命名空间，如 global、user |
| 第三层 | object | 翻译消息键值对 |

### IntlProvider
react-intl 的国际化 Provider 组件，提供完整的国际化上下文支持。

#### 属性说明
| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| locale | string | 是 | - | 当前语言 |
| messages | object | 是 | - | 翻译消息对象 |
| children | ReactNode | 是 | - | 子组件 |

### 默认导出
默认导出为 createIntl 函数，用于创建国际化实例。

#### 配置参数
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| locale | string | 否 | zh-CN | 语言标识 |
| message | object | 否 | - | 翻译消息对象 |
| namespace | string | 否 | global | 命名空间 |

#### 返回值
| 类型 | 说明 |
|------|------|
| IntlShape | react-intl 的国际化实例对象 |

