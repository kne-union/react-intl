import React, { forwardRef } from 'react';
import localeLoader, { message } from './loader';
import { IntlProvider, createIntl as createIntlBase } from 'react-intl';
import { useContext } from '@kne/global-context';

const withIntlProvider = WrappedComponents =>
  forwardRef(({ locale: propsLocale, namespace, ...props }, ref) => {
    const context = useContext();
    const locale = propsLocale || context?.locale || 'zh-CN';
    return (
      <IntlProvider messages={message[locale]?.[namespace || 'global']} locale={locale}>
        <WrappedComponents {...props} ref={ref} />
      </IntlProvider>
    );
  });

export const createWithIntlProvider = (defaultLocale, defaultMessage, namespace) => {
  localeLoader(defaultLocale, defaultMessage, namespace);
  return WrappedComponents =>
    forwardRef(({ locale: propsLocale, ...props }, ref) => {
      const context = useContext();
      const locale = propsLocale || context?.locale || defaultLocale || 'zh-CN';
      return (
        <IntlProvider messages={message[locale]?.[namespace || 'global']} locale={locale}>
          <WrappedComponents {...props} ref={ref} />
        </IntlProvider>
      );
    });
};

export * from 'react-intl';

export const createIntl = ({ locale = 'zh-CN', message: propsMessage, namespace }) => {
  propsMessage && localeLoader(locale, propsMessage, namespace);
  return createIntlBase({ locale, message });
};

export { localeLoader, IntlProvider };

export default createIntl;
