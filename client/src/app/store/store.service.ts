import { Injectable } from '@angular/core';
import { productData } from '../shared/models/productData';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private http: HttpClient) {}
  public apiUrl = 'http://localhost:8080/api/products';

  getProducts(
    brandId?: number,
    typeId?: number,
    url?: string,
  ): Observable<productData> {
    // construct the url based on brandId and TypeId
    const apiUrl = url || this.apiUrl;
    return this.http.get<productData>(apiUrl);
  }
  getProduct(id: number) {
    return this.http.get<Product>(this.apiUrl + '/' + id);
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
