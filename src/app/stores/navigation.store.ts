import { computed, Injectable, signal } from '@angular/core';

export interface NavItem {
  path: string;
  label: string;
  icon: string;
}

@Injectable({ providedIn: 'root' })
export class NavigationStore {
  readonly items: NavItem[] = [
    { path: '/home', label: 'Home', icon: 'home' },
    { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/settings', label: 'Settings', icon: 'settings' },
  ];

  readonly sidenavOpen = signal(true);
  readonly pageTitle = signal('Home');

  readonly sidenavIcon = computed(() => this.sidenavOpen() ? 'menu_open' : 'menu');

  toggleSidenav(): void {
    this.sidenavOpen.update(open => !open);
  }

  setPageTitle(title: string): void {
    this.pageTitle.set(title);
  }
}
