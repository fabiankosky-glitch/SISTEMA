
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private auth = inject(Auth);
  private router = inject(Router);

  email = 'admin@example.com';
  password = 'password123'; // The correct password
  errorMessage = signal<string | null>(null);

  async login() {
    this.errorMessage.set(null);
    try {
      // Now we only sign in, because the user exists and config is correct
      await signInWithEmailAndPassword(this.auth, this.email, this.password);
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      this.errorMessage.set(this.getFriendlyErrorMessage(error.code));
    }
  }

  private getFriendlyErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'El formato del correo electrónico no es válido.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Usuario o contraseña incorrectos.';
      default:
        return 'Ocurrió un error inesperado. Código: ' + errorCode;
    }
  }
}
