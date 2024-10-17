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
  imports: [CommonModule, ReactiveFormsModule], // Asegúrate de importar ReactiveFormsModule
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  categoryForm: FormGroup;
  category_id: number = 0;
  swal = Swal;

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
    if (this.category_id === 0) {
      this.onSubmitCreate();
    } else {
      this.onSubmitUpdate();
    }
  }

  onSubmitCreate(): void {
    // if (this.categoryForm.valid) {
    //   const newCategory: Category = {
    //     category_id: this.categories.length + 1,
    //     category: this.categoryForm.value.category,
    //     tag: this.categoryForm.value.tag,
    //     status: 'active',
    //   };
    //   this.categories.push(newCategory);
    //   this.categoryForm.reset();
    // }
    console.log(this.categoryForm.value);
    this.service.createCategory(this.categoryForm.value).subscribe({
      next: (v) => {
        this.getCategories();
        this.categoryForm.reset();
        this.successMessage(v.message);
      },
      error: (e) => {
        this.errorMessage(e.error.message);
      },
    });
  }

  onSubmitUpdate() {
    this.service
      .updateCategory(this.categoryForm.value, this.category_id)
      .subscribe({
        next: (v) => {
          this.getCategories();
          this.categoryForm.reset();
          this.successMessage(v.message);
        },
        error: (e) => {
          this.errorMessage(e.error.message);
        },
      });
  }

  disableCategory(id: number) {
    this.service.deleteCategory(id).subscribe({
      next: (v) => {
        this.getCategories();
        this.successMessage(v.message);
      },
      error: (e) => {
        this.errorMessage(e.error!.message);
      },
    });
  }

  enableCategory(id: number) {
    this.service.activateCategory(id).subscribe({
      next: (v) => {
        this.getCategories();
        this.successMessage(v.message);
      },
      error: (e) => {
        this.errorMessage(e.error!.message);
      },
    });
  }
}
