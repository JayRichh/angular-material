import { Component, inject, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ThemeStore } from '../../stores/theme.store';
import { NavigationStore } from '../../stores/navigation.store';

@Component({
  selector: 'app-settings',
  imports: [MatSlideToggleModule, MatDividerModule, MatIconModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings implements OnInit {
  protected readonly theme = inject(ThemeStore);
  private readonly nav = inject(NavigationStore);

  ngOnInit(): void {
    this.nav.setPageTitle('Settings');
  }
}
