import { TestBed } from '@angular/core/testing';
import { NavigationStore } from './navigation.store';

describe('NavigationStore', () => {
  let store: NavigationStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(NavigationStore);
  });

  it('should have three navigation items', () => {
    expect(store.items).toHaveLength(3);
  });

  it('should include home, dashboard, and settings', () => {
    const paths = store.items.map(item => item.path);
    expect(paths).toEqual(['/home', '/dashboard', '/settings']);
  });

  it('should start with sidenav open', () => {
    expect(store.sidenavOpen()).toBe(true);
  });

  it('should toggle sidenav state', () => {
    store.toggleSidenav();
    expect(store.sidenavOpen()).toBe(false);

    store.toggleSidenav();
    expect(store.sidenavOpen()).toBe(true);
  });

  it('should compute correct sidenav icon', () => {
    expect(store.sidenavIcon()).toBe('menu_open');

    store.toggleSidenav();
    expect(store.sidenavIcon()).toBe('menu');
  });

  it('should update page title', () => {
    store.setPageTitle('Dashboard');
    expect(store.pageTitle()).toBe('Dashboard');
  });

  it('should default page title to Home', () => {
    expect(store.pageTitle()).toBe('Home');
  });
});
