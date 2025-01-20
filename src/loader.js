export const message = {};

const loader = (locale, localeMessage, namespace) => {
  if (!message[locale]) {
    message[locale] = {};
  }
  message[locale][namespace || 'global'] = Object.assign({}, message[locale][namespace || 'global'], localeMessage);
  return message;
};

export default loader;
