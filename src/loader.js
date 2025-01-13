export const message = {};

const loader = (locale, localeMessage) => {
  message[locale] = Object.assign({}, message[locale], localeMessage);
  return message;
};

export default loader;
