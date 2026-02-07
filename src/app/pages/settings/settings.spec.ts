import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Settings } from './settings';
import { ThemeStore } from '../../stores/theme.store';
import { NavigationStore } from '../../stores/navigation.store';

describe('Settings', () => {
  let fixture: ComponentFixture<Settings>;
  let themeStore: ThemeStore;
  let navStore: NavigationStore;

  beforeEach(async () => {
    document.body.classList.remove('dark-theme');
    await TestBed.configureTestingModule({
      imports: [Settings],
      providers: [provideAnimationsAsync()],
    }).compileComponents();

    themeStore = TestBed.inject(ThemeStore);
    navStore = TestBed.inject(NavigationStore);
    fixture = TestBed.createComponent(Settings);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should set page title to Settings on init', () => {
    expect(navStore.pageTitle()).toBe('Settings');
  });

  it('should render settings groups', () => {
    const groups = fixture.nativeElement.querySelectorAll('.settings-group');
    expect(groups.length).toBe(2);
  });

  it('should render the dark mode toggle', () => {
    const toggle = fixture.nativeElement.querySelector('mat-slide-toggle');
    expect(toggle).toBeTruthy();
  });

  it('should display current theme mode', () => {
    const content = fixture.nativeElement.textContent;
    expect(content).toContain('light');
  });

  it('should reflect dark mode after toggle', () => {
    themeStore.toggle();
    fixture.detectChanges();
    const content = fixture.nativeElement.textContent;
    expect(content).toContain('dark');
  });
});
