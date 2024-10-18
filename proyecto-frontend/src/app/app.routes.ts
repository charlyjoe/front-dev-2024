import { Routes } from '@angular/router';
import { CategoryComponent } from './modules/product/component/category/category.component';
import { LoginComponent } from './modules/auth/component/login/login.component';
import { authenticationGuard } from './modules/auth/authentication.guard';
export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'secured', component: CategoryComponent, canActivate: [authenticationGuard] },
];
