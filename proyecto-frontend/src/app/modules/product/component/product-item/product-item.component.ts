import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../_service/product.service';
import { ProductDetailsService } from '../../_service/product-details.service';
import { CategoryService } from '../../_service/category.service';
import { Product } from '../../_model/product';
import { ProductImage } from '../../_model/product-image';
import { Category } from '../../_model/category';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../../auth/_service/authentication.service';
import { CartService } from '../../../invoice/_service/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
})
export class ProductItemComponent {
  gtin: string | null = null;
  product: Product = new Product();
  categories: Category[] = [];
  productImages: ProductImage[] = [];
  isLoggedIn: boolean;
  isAdmin: boolean;
  swal = Swal;
  quantity: number = 0;
  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private productDetailsService: ProductDetailsService,
    private categoryService: CategoryService,
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
    this.gtin = this.route.snapshot.paramMap.get('gtin');
    this.getProduct();
  }

  logout(): void {
    this.authService.logOut();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

  async getProduct(): Promise<void> {
    if (!this.gtin) return;
    this.productService.getProduct(this.gtin).subscribe({
      next: (v) => {
        this.product = v;
        this.getProductImages();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  getProductImages() {
    this.productDetailsService
      .getProductImages(this.product.product_id)
      .subscribe({
        next: (v) => {
          this.productImages = v;
        },
        error: (e) => {
          console.log(e);
        },
      });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (v) => {
        this.categories = v;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  addToCart(quantity: number) {
    if (quantity < 1) {
      this.errorMessage('La cantidad debe ser al menos 1.');
      return;
    }
    this.cartService.addToCart({ gtin: this.gtin, quantity }).subscribe({
      next: (v) => {
        this.successMessage(v.message);
        this.redirect('/catalog');
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
  goToProducts(): void {
    this.router.navigate(['/catalog']); 
  }
  goCart(): void {
    this.router.navigate(['/cart']);
  }
}
