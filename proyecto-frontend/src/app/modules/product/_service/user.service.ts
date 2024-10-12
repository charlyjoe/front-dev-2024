import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private source = '/region';
  constructor(private http: HttpClient) {}
  getUsers() {
    return this.http.get(api_dwb_uri + this.source);
  }
}
