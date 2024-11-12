import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../_service/product.service';
import { ProductDetailsService } from '../../_service/product-details.service';
import { CategoryService } from '../../_service/category.service';
import { Product } from '../../_model/product';
import { ProductImage } from '../../_model/product-image';
import { NgxPhotoEditorService, NgxPhotoEditorModule } from 'ngx-photo-editor';
import { Category } from '../../_model/category';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgxPhotoEditorModule,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  gtin: string | null = null;
  product: Product = new Product();
  categories: Category[] = [];
  productImages: ProductImage[] = [];
  form: FormGroup;
  swal = Swal;
  submitted = false;
  faTrashAlt = faTrashAlt;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private productDetailsService: ProductDetailsService,
    private categoryService: CategoryService,
    private router: Router,
    private fb: FormBuilder,
    private ngxService: NgxPhotoEditorService
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

  ngOnInit(): void {
    this.gtin = this.route.snapshot.paramMap.get('gtin');
    this.getProduct();
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

  async getProduct(): Promise<void> {
    if (!this.gtin) return;
    this.productService.getProduct(this.gtin).subscribe({
      next: (v) => {
        this.product = v;
        this.getProductImages();
      },
      error: (e) => {
        this.errorMessage(e.message);
      },
    });
  }

  getProductImages() {
    this.productDetailsService
      .getProductImages(this.product.product_id)
      .subscribe({
        next: (v) => {
          this.productImages = v;
          console.log(v);
        },
        error: (e) => {
          this.errorMessage(e.message);
        },
      });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (v) => {
        this.categories = v;
      },
      error: (e) => {
        this.errorMessage(e.message);
      },
    });
  }

  onSubmit() {
    this.productService
      .updateProduct(this.form.value, this.product.product_id)
      .subscribe({
        next: (v) => {
          this.getProduct();
          this.form.reset();
          this.successMessage(v.message);
        },
        error: (e) => {
          this.errorMessage(e.error.message);
        },
      });
  }

  updateProduct() {
    this.form.reset();
    this.form.controls['product'].setValue(this.product.product);
    this.form.controls['gtin'].setValue(this.product.gtin);
    this.form.controls['price'].setValue(this.product.status);
    this.form.controls['description'].setValue(this.product.description);
    this.form.controls['stock'].setValue(this.product.stock);
    this.getCategories();
  }

  deleteProductImage(id: number) {
    this.productDetailsService.deleteProductImage(id).subscribe({
      next: (v) => {
        this.getProductImages();
        this.successMessage(v.message);
      },
      error: (e) => {
        this.errorMessage(e.message);
      },
    });
  }

  uploadProductImage(image: string) {
    let productImage: ProductImage = new ProductImage();
    productImage.image = image;
    this.productDetailsService
      .uploadProductImage(image, this.product.product_id)
      .subscribe({
        next: (v) => {
          this.getProductImages();
          this.successMessage(v.message);
        },
        error: (e) => {
          this.errorMessage(e.message);
        },
      });
  }

  fileChangeHandler($event: any) {
    this.ngxService
      .open($event, {
        aspectRatio: 1 / 1,
        autoCropArea: 1,
        resizeToWidth: 360,
        resizeToHeight: 360,
      })
      .subscribe((data) => {
        this.uploadProductImage(data.base64!);
        $event.target.value = '';
      });
  }

  redirect(url: string) {
    this.router.navigate([url]);
  }
}
