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

  getProducts(brandId?: number, typeId?: number): Observable<productData> {
    // construct the url based on brandId and TypeId
    let url = `${this.apiUrl}?`;

    // check brandId is not 0 and add it
    if (brandId && brandId !== 0) {
      url = url + `&brandId=${brandId}&`;
    }
    if (typeId && typeId !== 0) {
      url = url + `&typeId=${typeId}&`;
    }
    // Remove the trailing '&' if exist
    if (url.endsWith('&')) {
      url = url.slice(0, -1);
    }

    return this.http.get<productData>(url);
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
