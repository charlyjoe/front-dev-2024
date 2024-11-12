import { Routes } from '@angular/router';
import { CategoryComponent } from './modules/product/component/category/category.component';
import { ProductComponent } from './modules/product/component/product/product.component';
import { ProductDetailsComponent } from './modules/product/component/product-details/product-details.component';
import { LoginComponent } from './modules/auth/component/login/login.component';
import { HomeComponent } from './modules/product/component/home/home.component';
import { authenticationGuard } from './modules/auth/authentication.guard';
import { ProductListComponent } from './modules/product/component/product-list/product-list.component';
import { ProductItemComponent } from './modules/product/component/product-item/product-item.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'category',
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
  {
    path: 'catalog',
    component: ProductListComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: 'item/:gtin',
    component: ProductItemComponent,
    canActivate: [authenticationGuard],
  },
];
