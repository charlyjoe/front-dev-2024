import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../_service/category.service';
import { ProductService } from '../../_service/product.service';
import { ProductDetailsService } from '../../_service/product-details.service';
import { Category } from '../../_model/category';
import { DtoProductList } from '../../_dto/dto-product-list';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private productDetailsService: ProductDetailsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getActiveProducts();
    this.getActiveCategories();
  }

  getActiveProducts(): void {
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

  redirect(gtin: string) {
    this.router.navigate(['/item', gtin]);
  }
}
