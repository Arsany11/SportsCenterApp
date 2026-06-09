import { Injectable } from '@angular/core';
import { productData } from '../shared/models/productData';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:8080/api/products';

  getProducts(): Observable<productData> {
    return this.http.get<productData>(this.apiUrl);
  }

  getBrands(): Observable<Type[]> {
    const url = `${this.apiUrl}/brands`;
    return this.http.get<Type[]>(url);
  }

  getTypes(): Observable<Type[]> {
    const url = `${this.apiUrl}/types`;
    return this.http.get<Type[]>(url);
  }
}
