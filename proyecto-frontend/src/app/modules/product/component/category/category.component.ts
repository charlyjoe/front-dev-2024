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

  constructor(private service: CategoryService, private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      category: ['', Validators.required],
      tag: ['', Validators.required],
    });
  }

  getCategories(): void {
    this.categories = this.service.getCategories();
  }

  ngOnInit(): void {
    this.getCategories();
  }

  addCategory(): void {
    if (this.categoryForm.valid) {
      const newCategory: Category = {
        categoryId: this.categories.length + 1,
        category: this.categoryForm.value.category,
        tag: this.categoryForm.value.tag,
        status: 'active',
      };
      this.categories.push(newCategory);
      this.categoryForm.reset();
    }
  }
}
