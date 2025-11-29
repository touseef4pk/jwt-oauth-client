import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-google-callback',
  standalone: true,
  imports: [CommonModule],
  template: `<p>Signing in...</p>`
})
export class GoogleCallbackComponent {

  constructor(private auth: AuthService, private router: Router) {}

  async ngOnInit() {
    debugger
    const result = await this.auth.processGoogleLogin();

    if (result) {
      // backend returns your own JWT tokens
      result.subscribe((tokens: any) => {
        this.auth.storeTokens(tokens);
        this.router.navigate(['/home']);
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}

