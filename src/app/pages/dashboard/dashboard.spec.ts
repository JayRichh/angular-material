import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Dashboard } from './dashboard';
import { NavigationStore } from '../../stores/navigation.store';

describe('Dashboard', () => {
  let fixture: ComponentFixture<Dashboard>;
  let navStore: NavigationStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [provideAnimationsAsync()],
    }).compileComponents();

    navStore = TestBed.inject(NavigationStore);
    fixture = TestBed.createComponent(Dashboard);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should set page title to Dashboard on init', () => {
    expect(navStore.pageTitle()).toBe('Dashboard');
  });

  it('should render stat cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.stats-grid mat-card');
    expect(cards.length).toBe(4);
  });

  it('should render the activity list', () => {
    const list = fixture.nativeElement.querySelector('.activity-list');
    expect(list).toBeTruthy();
  });

  it('should render activity rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('.activity-row');
    expect(rows.length).toBe(5);
  });

  it('should display stat values', () => {
    const statValues = fixture.nativeElement.querySelectorAll('.stat-value');
    expect(statValues.length).toBeGreaterThan(0);
  });

  it('should have computed totalUsers', () => {
    const component = fixture.componentInstance as any;
    expect(component.totalUsers()).toBe(1247);
  });
});
