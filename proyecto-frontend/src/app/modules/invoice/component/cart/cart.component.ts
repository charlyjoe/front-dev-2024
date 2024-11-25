import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthenticationService } from '../../../auth/_service/authentication.service';
import { CartService } from '../../_service/cart.service';
import { InvoiceService } from '../../_service/invoice.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DtoCartDetails } from '../../_dto/dto-cart-details';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  isLoggedIn: boolean;
  isAdmin: boolean;
  cartItems: DtoCartDetails[] = [];
  swal = Swal;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private cartService: CartService,
    private invoiceService: InvoiceService
  ) {
    this.isLoggedIn = this.authService.isUserLoggedIn();
    this.isAdmin = this.authService.isAdmin();
  }

  successMessage(message: string) {
    this.swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: message,
    });
  }

  errorMessage(message: string) {
    this.swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
    });
  }

  ngOnInit(): void {
    this.getCart();
  }

  logout(): void {
    this.authService.logOut();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

  getCart(): void {
    this.cartService.getCart().subscribe({
      next: (v) => {
        this.cartItems = v;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  removeFromCart(cart_id: number): void {
    this.cartService.removeFromCart(cart_id).subscribe({
      next: () => {
        this.getCart();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  deleteCart(): void {
    this.cartService.deleteCart().subscribe({
      next: () => {
        this.cartItems = [];
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  generateInvoice() {
    this.invoiceService.generateInvoice().subscribe({
      next: () => {
        this.successMessage('Se ha realizado tu compra con éxito!');
        this.getCart();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  getTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0
    );
  }
  goBack(): void {
    this.router.navigate(['/']);
  }
}
