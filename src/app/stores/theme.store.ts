import { computed, effect, Injectable, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeStore {
  private readonly document = inject(DOCUMENT);
  private readonly storageKey = 'angular-material-theme';

  readonly mode = signal<ThemeMode>(this.loadTheme());
  readonly isDark = computed(() => this.mode() === 'dark');
  readonly icon = computed(() => this.isDark() ? 'light_mode' : 'dark_mode');
  readonly label = computed(() => this.isDark() ? 'Switch to light mode' : 'Switch to dark mode');

  constructor() {
    effect(() => {
      const current = this.mode();
      this.document.body.classList.toggle('dark-theme', current === 'dark');
      this.saveTheme(current);
    });
  }

  toggle(): void {
    this.mode.update(m => m === 'light' ? 'dark' : 'light');
  }

  private loadTheme(): ThemeMode {
    try {
      const stored = this.getStorage()?.getItem(this.storageKey);
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
    } catch { /* storage unavailable */ }
    return 'light';
  }

  private saveTheme(mode: ThemeMode): void {
    try {
      this.getStorage()?.setItem(this.storageKey, mode);
    } catch { /* storage unavailable */ }
  }

  private getStorage(): Storage | null {
    try {
      const storage = this.document.defaultView?.localStorage;
      return storage && typeof storage.getItem === 'function' ? storage : null;
    } catch {
      return null;
    }
  }
}
