import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private auth = inject(Auth);
  private router = inject(Router);

  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }
}
