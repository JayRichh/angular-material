import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { NavigationStore } from '../../stores/navigation.store';

interface StatCard {
  label: string;
  value: string;
  icon: string;
  trend: 'up' | 'down' | 'flat';
  accent: string;
}

interface Activity {
  action: string;
  target: string;
  time: string;
  icon: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatIconModule, MatDividerModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private readonly nav = inject(NavigationStore);

  protected readonly stats = signal<StatCard[]>([
    { label: 'Total Users', value: '1,247', icon: 'people', trend: 'up', accent: 'primary' },
    { label: 'Active Now', value: '342', icon: 'bolt', trend: 'up', accent: 'tertiary' },
    { label: 'Error Rate', value: '0.2%', icon: 'error_outline', trend: 'down', accent: 'error' },
    { label: 'Uptime', value: '99.9%', icon: 'check_circle', trend: 'flat', accent: 'primary' },
  ]);

  protected readonly activities = signal<Activity[]>([
    { action: 'Deployed', target: 'v2.1.0 to production', time: '2m ago', icon: 'rocket_launch' },
    { action: 'Merged', target: 'PR #142 — Fix auth flow', time: '15m ago', icon: 'merge' },
    { action: 'Opened', target: 'Issue #89 — Dark mode', time: '1h ago', icon: 'bug_report' },
    { action: 'Updated', target: 'Dependencies to latest', time: '3h ago', icon: 'update' },
    { action: 'Reviewed', target: 'PR #138 — Add metrics', time: '5h ago', icon: 'rate_review' },
  ]);

  protected readonly totalUsers = computed(() => 1247);

  protected readonly trendIcon = (trend: string) =>
    trend === 'up' ? 'trending_up' : trend === 'down' ? 'trending_down' : 'trending_flat';

  ngOnInit(): void {
    this.nav.setPageTitle('Dashboard');
  }
}
