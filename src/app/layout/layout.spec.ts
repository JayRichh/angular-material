import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Layout } from './layout';
import { NavigationStore } from '../stores/navigation.store';

describe('Layout', () => {
  let fixture: ComponentFixture<Layout>;
  let navStore: NavigationStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Layout],
      providers: [provideRouter([]), provideAnimationsAsync()],
    }).compileComponents();

    fixture = TestBed.createComponent(Layout);
    navStore = TestBed.inject(NavigationStore);
    fixture.detectChanges();
  });

  it('should create the layout', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the toolbar', () => {
    const toolbar = fixture.nativeElement.querySelector('mat-toolbar');
    expect(toolbar).toBeTruthy();
  });

  it('should render the sidenav', () => {
    const sidenav = fixture.nativeElement.querySelector('mat-sidenav');
    expect(sidenav).toBeTruthy();
  });

  it('should render navigation items', () => {
    const navItems = fixture.nativeElement.querySelectorAll('mat-nav-list a');
    expect(navItems.length).toBe(3);
  });

  it('should display the page title in the toolbar', () => {
    navStore.setPageTitle('Test Page');
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('.toolbar-title');
    expect(title?.textContent).toContain('Test Page');
  });

  it('should have a theme toggle button in sidenav', () => {
    const sidenavButtons = fixture.nativeElement.querySelectorAll('.sidenav-bottom button[mat-icon-button]');
    const themeButton = Array.from(sidenavButtons).find(
      (btn: any) => btn.textContent?.includes('dark_mode') || btn.textContent?.includes('light_mode')
    );
    expect(themeButton).toBeTruthy();
  });

  it('should have a menu toggle button', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button[mat-icon-button]');
    const menuButton = Array.from(buttons).find(
      (btn: any) => btn.textContent?.includes('menu_open') || btn.textContent?.includes('menu')
    );
    expect(menuButton).toBeTruthy();
  });

  it('should render the brand icon', () => {
    const brand = fixture.nativeElement.querySelector('.sidenav-brand .brand-icon');
    expect(brand).toBeTruthy();
  });
});
