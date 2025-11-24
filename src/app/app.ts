import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from "./auth/login/login";
import { AuthService } from './services/auth-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('jwt-auth-client');

constructor(private auth: AuthService) {}

async ngOnInit() {
  await this.auth.processGoogleLogin();
}
}
