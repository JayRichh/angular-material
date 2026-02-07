import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { RouterLink } from '@angular/router';
import { NavigationStore } from '../../stores/navigation.store';
import { ThemeStore } from '../../stores/theme.store';

interface QuickLink {
  label: string;
  icon: string;
  route: string;
  surface: string;
}

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatIconModule, MatRippleModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private readonly nav = inject(NavigationStore);
  protected readonly theme = inject(ThemeStore);

  protected readonly greeting = signal(this.buildGreeting());

  protected readonly links: QuickLink[] = [
    { label: 'Dashboard', icon: 'space_dashboard', route: '/dashboard', surface: 'primary' },
    { label: 'Settings', icon: 'tune', route: '/settings', surface: 'tertiary' },
    { label: 'Theme', icon: 'contrast', route: '/settings', surface: 'secondary' },
  ];

  protected readonly recentItems = signal([
    { label: 'Active sessions', value: '342', icon: 'bolt' },
    { label: 'Uptime', value: '99.9%', icon: 'verified' },
    { label: 'Deployments today', value: '3', icon: 'rocket_launch' },
  ]);

  ngOnInit(): void {
    this.nav.setPageTitle('Home');
  }

  private buildGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }
}
