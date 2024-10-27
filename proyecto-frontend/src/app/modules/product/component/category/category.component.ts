import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Category } from '../../_model/category';
import { CategoryService } from '../../_service/category.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  categoryForm: FormGroup;
  category_id: number = 0;
  swal = Swal;
  isActiveList: boolean = false;
  showAllCategories: boolean = false;
  submitted = false;

  constructor(private service: CategoryService, private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      category: ['', Validators.required],
      tag: ['', Validators.required],
      status: ['', Validators.required],
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

  getCategories(): void {
    this.service.getCategories().subscribe({
      next: (v) => {
        this.isActiveList = false;
        this.categories = v;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  toggleCategoryFilter(): void {
    this.showAllCategories = !this.showAllCategories;
    if (this.showAllCategories) {
      this.getCategories();
    } else {
      this.getActiveCategories();
    }
  }

  getActiveCategories(): void {
    this.service.getActiveCategories().subscribe({
      next: (v) => {
        this.isActiveList = true;
        this.categories = v;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }

  onSubmit(): void {
    this.submitted = true;
    console.log(this.category_id);
    if (this.categoryForm.invalid) return;
    if (this.category_id === 0) {
      this.onSubmitCreate();
    } else {
      this.onSubmitUpdate();
    }

    this.category_id = 0;
    this.submitted = false;
  }

  onSubmitCreate(): void {
    this.service.createCategory(this.categoryForm.value).subscribe({
      next: (v) => {
        this.resetCategories();
        this.categoryForm.reset();
        this.successMessage(v.message);
      },
      error: (e) => {
        this.errorMessage(e.error.message);
      },
    });
  }

  onSubmitUpdate(): void {
    this.service
      .updateCategory(this.categoryForm.value, this.category_id)
      .subscribe({
        next: (v) => {
          this.resetCategories();
          this.categoryForm.reset();
          this.successMessage(v.message);
        },
        error: (e) => {
          this.errorMessage(e.error.message);
        },
      });
  }

  disableCategory(id: number): void {
    this.service.deleteCategory(id).subscribe({
      next: (v) => {
        this.resetCategories();
        this.successMessage(v.message);
      },
      error: (e) => {
        this.errorMessage(e.error!.message);
      },
    });
  }

  enableCategory(id: number): void {
    this.service.activateCategory(id).subscribe({
      next: (v) => {
        this.resetCategories();
        this.successMessage(v.message);
      },
      error: (e) => {
        this.errorMessage(e.error!.message);
      },
    });
  }

  updateCategory(category: Category): void {
    this.category_id = category.category_id;
    this.categoryForm.reset();
    this.categoryForm.controls['category'].setValue(category.category);
    this.categoryForm.controls['tag'].setValue(category.tag);
    this.categoryForm.controls['status'].setValue(category.status);
  }

  createCategory(): void {
    this.category_id = 0;
    this.categoryForm.reset();
  }

  resetCategories() {
    if (this.isActiveList) {
      this.getActiveCategories();
    } else {
      this.getCategories();
    }
  }
}
