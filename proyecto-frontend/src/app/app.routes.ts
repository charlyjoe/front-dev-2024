import { Routes } from '@angular/router';
import { CategoryComponent } from './modules/product/component/category/category.component';
import { ProductComponent } from './modules/product/component/product/product.component';
import { ProductDetailsComponent } from './modules/product/component/product-details/product-details.component';
import { LoginComponent } from './modules/auth/component/login/login.component';
import { authenticationGuard } from './modules/auth/authentication.guard';
export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'secured',
    component: CategoryComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: 'product/:gtin',
    component: ProductDetailsComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: 'product',
    component: ProductComponent,
    canActivate: [authenticationGuard],
  },
];
