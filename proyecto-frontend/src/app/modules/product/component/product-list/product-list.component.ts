import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../_service/category.service';
import { ProductService } from '../../_service/product.service';
import { ProductDetailsService } from '../../_service/product-details.service';
import { Category } from '../../_model/category';
import { DtoProductList } from '../../_dto/dto-product-list';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../auth/_service/authentication.service';
import { CartService } from '../../../invoice/_service/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: DtoProductList[] = [];
  productImages: string[] = [];
  categories: Category[] = [];
  isLoggedIn: boolean;
  isAdmin: boolean;
  swal = Swal;
  selectedCategory: string = 'Todas';

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private productDetailsService: ProductDetailsService,
    private router: Router,
    private authService: AuthenticationService,
    private cartService: CartService
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
    this.getActiveProducts();
    this.getActiveCategories();
  }
  logout(): void {
    this.authService.logOut();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
  getActiveProducts(): void {
    this.selectedCategory = 'Todas';
    this.productService.getActiveProducts().subscribe({
      next: (v) => {
        this.products = v;
        this.productImages = Array(this.products.length).fill('');
        for (let i = 0; i < this.products.length; i++) {
          this.getProductImage(this.products[i].product_id, i);
        }
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  getActiveCategories() {
    this.categoryService.getActiveCategories().subscribe({
      next: (v) => {
        this.categories = v;
        console.log(v);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  getProductImage(id: number, index: number) {
    this.productDetailsService.getProductImages(id).subscribe({
      next: (v) => {
        if (v.length > 0) {
          this.productImages[index] = v[0].image;
        }
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  getProductsByCategory(category: Category) {
    this.selectedCategory = category.category;
    this.productService.getProductsByCategory(category.category_id).subscribe({
      next: (v) => {
        this.products = v;
        this.productImages = Array(this.products.length).fill('');
        for (let i = 0; i < this.products.length; i++) {
          this.getProductImage(this.products[i].product_id, i);
        }
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  addToCart(gtin: string) {
    this.cartService.addToCart({ gtin, quantity: 1 }).subscribe({
      next: (v) => {
        this.successMessage(v.message);
      },
      error: (e) => {
        console.log(e);
        this.errorMessage('No se pudo agregar el producto al carrito');
      },
    });
  }

  redirect(url: string) {
    this.router.navigate([url]);
  }
  goCart(): void {
    this.router.navigate(['/cart']);
  }
}
