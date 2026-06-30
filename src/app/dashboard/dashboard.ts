import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private auth = inject(Auth);
  private router = inject(Router);

  librosSubmenuOpen = signal(false);

  toggleLibrosSubmenu() {
    this.librosSubmenuOpen.set(!this.librosSubmenuOpen());
  }

  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }
}
