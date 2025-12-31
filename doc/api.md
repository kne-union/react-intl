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
