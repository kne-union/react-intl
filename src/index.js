import React, { forwardRef } from 'react';
import localeLoader, { message } from './loader';
import { IntlProvider } from 'react-intl';

const createIntl = ({ locale, messages }) => {
  localeLoader(locale, messages);
  return WrappedComponents =>
    forwardRef(({ locale, ...props }, ref) => {
      return (
        <IntlProvider messages={message[locale]} locale={locale}>
          <WrappedComponents {...props} ref={ref} />
        </IntlProvider>
      );
    });
};

export * from 'react-intl';

export default createIntl;
