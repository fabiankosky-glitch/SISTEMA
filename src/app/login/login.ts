import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  private router = inject(Router);

  login() {
    // Aquí iría tu lógica de autenticación
    // Por ahora, solo redirigimos al dashboard
    this.router.navigate(['/dashboard']);
  }
}
