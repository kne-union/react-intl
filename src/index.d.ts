import { ReactNode, ComponentType, FC, ForwardRefExoticComponent, RefAttributes, PropsWithoutRef } from 'react';
import { IntlProvider as IntlProviderBase, IntlShape, createIntl as createIntlBase, useIntl as useIntlBase } from 'react-intl';

declare module '@kne/global-context' {
  export const useGlobalValue: (key: string) => any;
}

// loader 类型定义
export declare const localeLoader: (locale: string, defaultMessage: Record<string, any>, namespace?: string) => void;
export declare const message: Record<string, Record<string, Record<string, any>>>;
export declare const messagesLoader: (messages: Record<string, Record<string, any>>, namespace?: string) => void;

// withIntlProvider Props
export interface WithIntlProviderProps {
  locale?: string;
  namespace?: string;
  children?: ReactNode;
  [key: string]: any;
}

// withIntlProvider 类型
export declare const withIntlProvider: <P extends object>(WrappedComponents: ComponentType<P>) => ForwardRefExoticComponent<PropsWithoutRef<WithIntlProviderProps & P> & RefAttributes<any>>;

// argsParse 参数类型
export interface ArgsParseOptions {
  defaultLocale?: string;
  defaultMessage?: Record<string, any>;
  namespace?: string;
  messages?: Record<string, Record<string, any>>;
}

// createIntlProvider 组件 Props
export interface IntlProviderProps {
  locale?: string;
  children?: ReactNode | ((intl: IntlShape) => ReactNode);
}

// createIntlProvider 返回值类型
export declare const createIntlProvider: (...args: any[]) => FC<IntlProviderProps>;

// createWithIntlProvider 返回值类型
export declare const createWithIntlProvider: (...args: any[]) => <P extends object>(WrappedComponents: ComponentType<P>) => ForwardRefExoticComponent<PropsWithoutRef<P & { locale?: string }> & RefAttributes<any>>;

// createIntl 参数类型
export interface CreateIntlOptions {
  locale?: string;
  message?: Record<string, any>;
  namespace?: string;
}

// createIntl 返回值类型
export declare const createIntl: (options: CreateIntlOptions) => IntlShape;

// 默认导出
declare const defaultExport: typeof createIntl;
export default defaultExport;
