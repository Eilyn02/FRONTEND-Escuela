import {
  AfterViewInit,
  Component,
  signal,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

const SIDEBAR_KEY = 'shell_sidebar_collapsed';

@Component({
  selector: 'app-main-layout',
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
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayoutComponent implements AfterViewInit {
  constructor(private readonly router: Router) {}

  @ViewChild('sidenavShell') private sidenavShell?: MatSidenavContainer;

  /** Menú lateral estrecho (solo iconos) o ancho (icono + texto). */
  readonly sidebarCollapsed = signal(
    typeof localStorage !== 'undefined' && localStorage.getItem(SIDEBAR_KEY) === '1',
  );

  readonly nav = [
    { path: 'profesores', label: 'Profesores', icon: 'school' },
    { path: 'estudiantes', label: 'Estudiantes', icon: 'groups' },
    { path: 'grados', label: 'Grados', icon: 'class' },
    { path: 'materias', label: 'Materias', icon: 'menu_book' },
    { path: 'notas', label: 'Notas', icon: 'assignment' },
    { path: 'periodos', label: 'Periodos', icon: 'calendar_month' },
  ];

  ngAfterViewInit(): void {
    this.syncContentMarginsWithDrawer();
  }

  /**
   * El margen de `mat-sidenav-content` lo fija Material según el ancho del drawer.
   * Si solo cambiamos el ancho por CSS, hay que pedir un recálculo (y/o usar `autosize`).
   */
  private syncContentMarginsWithDrawer(): void {
    const shell = this.sidenavShell;
    if (!shell) {
      return;
    }

    shell.updateContentMargins();
  }

  toggleSidebar(): void {
    const next = !this.sidebarCollapsed();

    this.sidebarCollapsed.set(next);
    localStorage.setItem(SIDEBAR_KEY, next ? '1' : '0');

    queueMicrotask(() => this.syncContentMarginsWithDrawer());
    window.setTimeout(() => this.syncContentMarginsWithDrawer(), 80);
    window.setTimeout(() => this.syncContentMarginsWithDrawer(), 360);
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_role');
    void this.router.navigateByUrl('/login');
  }
}