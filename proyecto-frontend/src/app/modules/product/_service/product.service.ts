import { Injectable } from '@angular/core';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private source = '/product';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(api_dwb_uri + this.source);
  }

  getProduct(gtin: string): Observable<any> {
    return this.http.get(`${api_dwb_uri + this.source}/${gtin}`);
  }

  getActiveProducts(): Observable<any> {
    return this.http.get(api_dwb_uri + this.source + '/active');
  }

  createProduct(product: any): Observable<any> {
    return this.http.post(api_dwb_uri + this.source, product);
  }

  updateProduct(product: any, id: number): Observable<any> {
    return this.http.put(`${api_dwb_uri + this.source}/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${api_dwb_uri + this.source}/${id}`);
  }

  activateProduct(id: number): Observable<any> {
    return this.http.put(`${api_dwb_uri + this.source}/${id}/activate`, null);
  }

  getProductsByCategory(category_id: number): Observable<any> {
    return this.http.get(
      api_dwb_uri + this.source + '/category' + '/' + category_id
    );
  }

  updateProductStock(gtin: string, stock: number): Observable<any> {
    return this.http.put(
      api_dwb_uri + this.source + '/' + gtin + '/stock' + '/' + stock,
      null
    );
  }
}
