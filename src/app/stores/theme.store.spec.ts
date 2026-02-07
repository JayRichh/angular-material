import { TestBed } from '@angular/core/testing';
import { ThemeStore } from './theme.store';

describe('ThemeStore', () => {
  let store: ThemeStore;

  beforeEach(() => {
    document.body.classList.remove('dark-theme');
    TestBed.configureTestingModule({});
    store = TestBed.inject(ThemeStore);
  });

  it('should initialize with light mode by default', () => {
    expect(store.mode()).toBe('light');
    expect(store.isDark()).toBe(false);
  });

  it('should toggle between light and dark', () => {
    store.toggle();
    expect(store.mode()).toBe('dark');
    expect(store.isDark()).toBe(true);

    store.toggle();
    expect(store.mode()).toBe('light');
    expect(store.isDark()).toBe(false);
  });

  it('should compute correct icon based on mode', () => {
    expect(store.icon()).toBe('dark_mode');
    store.toggle();
    expect(store.icon()).toBe('light_mode');
  });

  it('should compute correct label based on mode', () => {
    expect(store.label()).toBe('Switch to dark mode');
    store.toggle();
    expect(store.label()).toBe('Switch to light mode');
  });

  it('should apply dark-theme class to body on toggle', () => {
    store.toggle();
    TestBed.flushEffects();
    expect(document.body.classList.contains('dark-theme')).toBe(true);

    store.toggle();
    TestBed.flushEffects();
    expect(document.body.classList.contains('dark-theme')).toBe(false);
  });

  it('should remain consistent after multiple toggles', () => {
    store.toggle();
    store.toggle();
    store.toggle();
    expect(store.mode()).toBe('dark');
    expect(store.isDark()).toBe(true);
  });
});
