import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';


@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}
  form: any;

  
  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    const token = localStorage.getItem('access_token');
    if (token) {
      this.router.navigate(['/home']);
    }
  }

submit() {
debugger;
   if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      username: this.form.value.email,
      password: this.form.value.password
    };

    this.auth.login(payload).subscribe({
      next: (tokens) => {
        this.auth.storeTokens(tokens);
        
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Login failed. Please check your credentials and try again.');
      }
    });

  }

  loginWithGoogle() {
    debugger;
  this.auth.googleLogin();
}

}
