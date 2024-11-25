import { Component } from '@angular/core';

import { AuthenticationService } from '../../../auth/_service/authentication.service';
import { ProductService } from '../../_service/product.service';
import { ProductDetailsService } from '../../_service/product-details.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isLoggedIn: boolean;
  isAdmin: boolean;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.isLoggedIn = this.authService.isUserLoggedIn();
    this.isAdmin = this.authService.isAdmin();
  }

  logout(): void {
    this.authService.logOut();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

  goCart(): void {
    this.router.navigate(['/cart']);
  }
}
