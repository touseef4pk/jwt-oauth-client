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
  user: any;

  ngOnInit() {
    debugger;
    this.user = this.auth.getCurrentUser();
  }

  logout(): void {
    debugger;

   this.auth.clearTokens();
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
