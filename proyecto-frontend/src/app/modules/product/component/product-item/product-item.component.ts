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

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private productDetailsService: ProductDetailsService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.gtin = this.route.snapshot.paramMap.get('gtin');
    this.getProduct();
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

  redirect(url: string) {
    this.router.navigate([url]);
  }
}
