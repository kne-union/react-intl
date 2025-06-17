export const message = {};

const loader = (locale, localeMessage, namespace) => {
  if (!message[locale]) {
    message[locale] = {};
  }
  message[locale][namespace || 'global'] = Object.assign({}, message[locale][namespace || 'global'], localeMessage);
  return message;
};

export const messagesLoader = (messages, namespace) => {
  Object.keys(messages).forEach(locale => {
    if (!message[locale]) {
      message[locale] = {};
    }
    message[locale][namespace || 'global'] = Object.assign({}, message[locale][namespace || 'global'], messages[locale]);
  });
};

export default loader;
