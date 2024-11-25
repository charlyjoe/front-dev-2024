import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  private source = '/product-image';

  constructor(private http: HttpClient) {}

  getProductImages(product_id: number): Observable<any> {
    return this.http.get(api_dwb_uri + this.source + '/' + product_id);
  }

  deleteProductImage(product_image_id: number): Observable<any> {
    return this.http.delete(api_dwb_uri + this.source + '/' + product_image_id);
  }

  uploadProductImage(image: any, product_id: number): Observable<any> {
    const body = { image, product_id };
    return this.http.post(api_dwb_uri + this.source, body);
  }
}
