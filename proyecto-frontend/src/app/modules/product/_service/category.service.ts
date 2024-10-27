import { Injectable } from '@angular/core';
import { Category } from '../_model/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor() {}

  getCategories(): Category[] {
    const categories: Category[] = [
      new Category(1, 'Tecnología', 'Tech', 'Active'),
      new Category(2, 'Artes', 'Art', 'Inactive'),
      new Category(3, 'Deportes', 'Sports', 'Active'),
    ];

    return categories;
  }
}
