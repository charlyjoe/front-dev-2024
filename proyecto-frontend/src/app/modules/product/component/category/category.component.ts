import { Component, OnInit } from '@angular/core';
import { Category } from '../../_model/category';
import { CategoryService } from '../../_service/category.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];

  constructor(private service: CategoryService) {}

  getCategories(): void {
    this.categories = this.service.getCategories();
  }

  ngOnInit(): void {
    this.getCategories();
  }
}
