import React, { forwardRef } from 'react';
import localeLoader, { message } from './loader';
import { IntlProvider, createIntl as createIntlBase } from 'react-intl';
import { useContext } from '@kne/global-context';

const withIntlProvider = WrappedComponents =>
  forwardRef(({ locale: propsLocale, namespace, ...props }, ref) => {
    const context = useContext();
    const locale = propsLocale || context?.locale;
    return (
      <IntlProvider messages={message[locale][namespace || 'global']} locale={locale}>
        <WrappedComponents {...props} ref={ref} />
      </IntlProvider>
    );
  });

export const createWithProvider = (defaultLocale, defaultMessage, namespace) => {
  localeLoader(defaultLocale, defaultMessage, namespace);
  return withIntlProvider;
};

export * from 'react-intl';

export const createIntl = ({ locale, message: propsMessage, namespace }) => {
  propsMessage && localeLoader(locale, propsMessage, namespace);
  return createIntlBase({ locale, message });
};

export { localeLoader, IntlProvider };

export default createIntl;
