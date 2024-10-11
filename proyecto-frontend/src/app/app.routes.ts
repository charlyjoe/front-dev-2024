import { Routes } from '@angular/router';
import { CategoryComponent } from './modules/product/component/category/category.component';
import { LoginComponent } from './login/login.component';
export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'categoria', component: CategoryComponent },
];
