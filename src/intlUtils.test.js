import { argsParse, resolveLocale, mergeIntlMessages, hasMessages } from './intlUtils';

describe('intlUtils', () => {
  describe('argsParse', () => {
    it('parses object config with defaultLocale', () => {
      expect(
        argsParse({
          defaultLocale: 'en-US',
          messages: { 'en-US': { hello: 'Hello' } }
        })
      ).toEqual({
        defaultLocale: 'en-US',
        messages: { 'en-US': { hello: 'Hello' } }
      });
    });

    it('infers defaultLocale from messages when missing', () => {
      expect(
        argsParse({
          messages: {
            'zh-CN': { hello: '你好' },
            'en-US': { hello: 'Hello' }
          }
        })
      ).toMatchObject({ defaultLocale: 'zh-CN' });
    });

    it('parses legacy positional args', () => {
      expect(argsParse('zh-CN', { hello: '你好' }, 'demo')).toEqual({
        defaultLocale: 'zh-CN',
        defaultMessage: { hello: '你好' },
        namespace: 'demo'
      });
    });
  });

  describe('resolveLocale', () => {
    it('prefers props locale over parent and default', () => {
      expect(
        resolveLocale({
          propsLocale: 'en-US',
          contextLocal: 'ja-JP',
          parentIntlLocale: 'de-DE',
          defaultLocale: 'zh-CN'
        })
      ).toBe('en-US');
    });

    it('inherits parent intl locale when props locale is absent', () => {
      expect(
        resolveLocale({
          propsLocale: undefined,
          contextLocal: undefined,
          parentIntlLocale: 'en-US',
          defaultLocale: 'zh-CN'
        })
      ).toBe('en-US');
    });

    it('falls back when defaultLocale is invalid', () => {
      expect(
        resolveLocale({
          propsLocale: undefined,
          contextLocal: undefined,
          parentIntlLocale: undefined,
          defaultLocale: { messages: {} }
        })
      ).toBe('zh-CN');
    });
  });

  describe('mergeIntlMessages', () => {
    it('merges parent and namespace messages', () => {
      expect(mergeIntlMessages({ hello: 'parent' }, { title: 'child' })).toEqual({
        hello: 'parent',
        title: 'child'
      });
    });
  });

  describe('hasMessages', () => {
    it('returns false for empty values', () => {
      expect(hasMessages(undefined)).toBe(false);
      expect(hasMessages({})).toBe(false);
    });

    it('returns true when keys exist', () => {
      expect(hasMessages({ hello: 'world' })).toBe(true);
    });
  });
});
