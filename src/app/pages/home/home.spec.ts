import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Home } from './home';
import { NavigationStore } from '../../stores/navigation.store';

describe('Home', () => {
  let fixture: ComponentFixture<Home>;
  let navStore: NavigationStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([]), provideAnimationsAsync()],
    }).compileComponents();

    navStore = TestBed.inject(NavigationStore);
    fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should set page title to Home on init', () => {
    expect(navStore.pageTitle()).toBe('Home');
  });

  it('should render a time-based greeting', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1?.textContent).toMatch(/Good (morning|afternoon|evening)/);
  });

  it('should render metric items', () => {
    const metrics = fixture.nativeElement.querySelectorAll('.metric');
    expect(metrics.length).toBe(3);
  });

  it('should render quick-link cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('mat-card');
    expect(cards.length).toBe(3);
  });
});
