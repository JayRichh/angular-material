import { Component, inject, viewChild } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeStore } from '../stores/theme.store';
import { NavigationStore } from '../stores/navigation.store';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  protected readonly theme = inject(ThemeStore);
  protected readonly nav = inject(NavigationStore);
  protected readonly sidenav = viewChild.required(MatSidenav);

  private readonly breakpointObserver = inject(BreakpointObserver);
  protected readonly isMobile = toSignal(
    this.breakpointObserver.observe([Breakpoints.Handset]).pipe(
      map(result => result.matches)
    ),
    { initialValue: false }
  );
}
