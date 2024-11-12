import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { DtoProductList } from '../../_dto/dto-product-list';
import { CategoryService } from '../../_service/category.service';
import { ProductService } from '../../_service/product.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Category } from '../../_model/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: DtoProductList[] = [];
  categories: Category[] = [];
  form: FormGroup;
  product_id: number = 0;
  swal = Swal;
  isActiveList: boolean = false;
  showAllProducts: boolean = false;
  submitted = false;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      product: ['', [Validators.required]],
      gtin: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
      description: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
      stock: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
      category_id: [0, [Validators.required]],
    });
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

  getProducts(): void {
    this.productService.getProducts().subscribe({
      next: (v) => {
        this.isActiveList = false;
        this.products = v;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  toggleProductFilter(): void {
    this.showAllProducts = !this.showAllProducts;
    if (this.showAllProducts) {
      this.getProducts();
    } else {
      this.getActiveProducts();
    }
  }

  getActiveProducts(): void {
    this.productService.getActiveProducts().subscribe({
      next: (v) => {
        this.isActiveList = true;
        this.products = v;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  ngOnInit(): void {
    this.getProducts();
    this.getActiveCategories();
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) return;
    if (this.product_id === 0) {
      this.onSubmitCreate();
    } else {
      this.onSubmitUpdate();
    }

    this.product_id = 0;
    this.submitted = false;
  }

  onSubmitCreate(): void {
    this.productService.createProduct(this.form.value).subscribe({
      next: (v) => {
        this.resetProducts();
        this.form.reset();
        this.successMessage(v.message);
      },
      error: (e) => {
        this.errorMessage(e.error.message);
      },
    });
  }

  onSubmitUpdate() {
    this.productService
      .updateProduct(this.form.value, this.product_id)
      .subscribe({
        next: (v) => {
          this.resetProducts();
          this.form.reset();
          this.successMessage(v.message);
        },
        error: (e) => {
          this.errorMessage(e.error.message);
        },
      });
  }

  disableProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: (v) => {
        this.resetProducts();
        this.successMessage(v.message);
      },
      error: (e) => {
        this.errorMessage(e.error!.message);
      },
    });
  }

  enableProduct(id: number) {
    this.productService.activateProduct(id).subscribe({
      next: (v) => {
        this.resetProducts();
        this.successMessage(v.message);
      },
      error: (e) => {
        this.errorMessage(e.error!.message);
      },
    });
  }

  updateProduct(product: DtoProductList) {
    this.product_id = product.product_id;
    this.form.reset();
    this.form.controls['product'].setValue(product.product);
    this.form.controls['gtin'].setValue(product.gtin);
    this.form.controls['price'].setValue(product.price);
  }

  resetProducts() {
    if (this.isActiveList) {
      this.getActiveProducts();
    } else {
      this.getProducts();
    }
    this.getActiveCategories();
  }
  createProduct(): void {
    this.product_id = 0;
    this.form.reset();
  }

  getActiveCategories() {
    this.categoryService.getActiveCategories().subscribe({
      next: (v) => {
        this.categories = v;
        console.log(v);
      },
      error: (e) => {
        console.log(e);
        this.errorMessage(e.error!.message);
      },
    });
  }

  redirect(gtin: string) {
    this.router.navigate(['/product', gtin]);
  }
}
