import { describe, it, expect } from 'vitest';
import { t, localePath, altLocale, ui } from '../../src/i18n/ui';

describe('i18n', () => {
  it('builds locale paths', () => {
    expect(localePath('th', '/work')).toBe('/th/work');
    expect(localePath('en', '/work')).toBe('/work');
    expect(localePath('th', '/')).toBe('/th/');
    expect(localePath('en', '/')).toBe('/');
  });
  it('has the thai fallback notice', () => {
    expect(t('th', 'fallback.notice')).toBe('ยังไม่มีฉบับภาษาไทย — แสดงเป็นภาษาอังกฤษ');
  });
  it('every key has en and th', () => {
    for (const [key, v] of Object.entries(ui)) {
      expect(v.en, key).toBeTruthy();
      expect(v.th, key).toBeTruthy();
    }
  });
  it('alternates locale', () => {
    expect(altLocale('en')).toBe('th');
    expect(altLocale('th')).toBe('en');
  });
});
