import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  imports: [CommonModule],
})
export class Home {
  constructor(private router: Router, private auth: AuthService ) {}

  products: any[] = [];

  logout(): void {

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    this.router.navigate(['/login']);
  }


  getProducts() {
  this.auth.getProducts().subscribe({
    next: (res) => {
      this.products = res;
    },
    error: (err) => {
      console.error('Error fetching products', err);
    },
  });
}
}
