import { Component, OnInit, Input } from '@angular/core';
import { StoreService } from './store.service';
import { Product } from '../shared/models/product';
import { CommonModule } from '@angular/common';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { ProductItemComponent } from './product-item/product-item.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-store',
  imports: [CommonModule, ProductItemComponent, FormsModule],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  constructor(private storeServices: StoreService) {}
  products: Product[] = [];
  brands: Type[] = [];
  types: Type[] = [];
  selectedBrand: Type | null = null;
  selectedType: Type | null = null;
  selectedSort = 'asc'; // default val

  @Input() title: string = '';
  ngOnInit() {
    // initialize selected brand ant type
    this.selectedBrand = { id: 0, name: 'All' };
    this.selectedType = { id: 0, name: 'All' };

    if (this.selectedBrand.id === 0 && this.selectedType.id === 0) {
      this.fetchProducts();
    } else {
      this.fetchProducts();
    }
    this.getBrands();
    this.getTypes();
  }
  fetchProducts() {
    //pass the brand/type ids
    const brandId = this.selectedBrand?.id;
    const typeId = this.selectedType?.id;

    // construct the url
    let url = `${this.storeServices.apiUrl}?`;

    // check the brand and type
    if (brandId && brandId !== 0) {
      url += `brandId=${brandId}&`;
    }
    if (typeId && typeId !== 0) {
      url += `typeId=${typeId}&`;
    }
    if(this.selectedSort){
      url += `sort=name&order=${this.selectedSort}&`;
    }
    // Remove the trailing '&' if exist
    if (url.endsWith('&')) {
      url = url.slice(0, -1);
    }

    this.storeServices.getProducts(brandId, typeId,url).subscribe({
      next: (data) => {
        this.products = data.content;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }
  getBrands() {
    this.storeServices.getBrands().subscribe({
      next: (response) => (this.brands = [{ id: 0, name: 'All' }, ...response]),
      error: (error) => console.log(error),
    });
  }
  getTypes() {
    this.storeServices.getTypes().subscribe({
      next: (response) => (this.types = [{ id: 0, name: 'All' }, ...response]),
      error: (error) => console.log(error),
    });
  }
  selectBrand(brand: Type) {
    // uppdate the selected brand then fetch the products
    this.selectedBrand = brand;
    this.fetchProducts();
  }

  selectType(type: Type) {
    // uppdate the selected brand then fetch the products
    this.selectedType = type;
    this.fetchProducts();
  }
  onSortChange() {
    this.fetchProducts();
  }
}
