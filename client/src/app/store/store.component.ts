import { Component, OnInit, Input } from '@angular/core';
import { StoreService } from './store.service';
import { Product } from '../shared/models/product';
import { CommonModule } from '@angular/common';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { ProductItemComponent } from './product-item/product-item.component';
import { FormsModule } from '@angular/forms';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { StoreModelService } from './store.model.service';
import { PaginationHeaderComponent } from '../shared/components/pagination-header/pagination-header.component';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, ProductItemComponent, FormsModule, PaginationModule, PaginationHeaderComponent,PaginationComponent],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  constructor(
    private storeServices: StoreService,
    public storeData: StoreModelService
  ) {}

  @Input() title: string = '';
  ngOnInit() {
    // initialize selected brand ant type
    this.storeData.selectedBrand = { id: 0, name: 'All' };
    this.storeData.selectedType = { id: 0, name: 'All' };
    this.fetchProducts();
    this.getBrands();
    this.getTypes();
  }

  pageChanged(event: PageChangedEvent): void {
    console.log('Page clicked:', event.page);
    console.log('Current page before update:', this.storeData.currentPage);

    if (event.page !== this.storeData.currentPage) {
      this.storeData.currentPage = event.page;
      this.fetchProducts(this.storeData.currentPage);
    }
  }

  fetchProducts(page: number = 1) {
    const backendPage = page ; // backend page is 0-based, frontend is 1-based
    //pass the brand/type ids
    const brandId = this.storeData.selectedBrand?.id;
    const typeId = this.storeData.selectedType?.id;

    // construct the url
    let url = `${this.storeServices.apiUrl}?`;

    // check the brand and type
    if (brandId && brandId !== 0) {
      url += `brandId=${brandId}&`;
    }
    if (typeId && typeId !== 0) {
      url += `typeId=${typeId}&`;
    }
    // search
    if (this.storeData.search) {
      url += `keyword=${this.storeData.search}&`;
    }

    // apend the page
    url += `page=${backendPage}&size=${this.storeData.pageSize}`;

    // sort
    if (this.storeData.selectedSort !== 'asc') {
      url += `&sort=name&order=${this.storeData.selectedSort}`;
    }

    this.storeServices.getProducts(brandId, typeId, url).subscribe({
      next: (data) => {
        this.storeData.products = data.content;
        this.storeData.pageable = data.pageable;
        this.storeData.totalElements = data.totalElements;
        // this.currentPage = this.pageable.pageNumber + 1; // update the current page based on backend response
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  getBrands() {
    this.storeServices.getBrands().subscribe({
      next: (response) => (this.storeData.brands = [{ id: 0, name: 'All' }, ...response]),
      error: (error) => console.log(error),
    });
  }
  getTypes() {
    this.storeServices.getTypes().subscribe({
      next: (response) => (this.storeData.types = [{ id: 0, name: 'All' }, ...response]),
      error: (error) => console.log(error),
    });
  }
  selectBrand(brand: Brand) {
    // uppdate the selected brand then fetch the products
    this.storeData.selectedBrand = brand;
    this.storeData.currentPage=1;
    this.fetchProducts();
  }

  selectType(type: Type) {
    // uppdate the selected brand then fetch the products
    this.storeData.selectedType = type;
    this.storeData.currentPage=1;
    this.fetchProducts();
  }
  onSortChange() {
    this.fetchProducts();
  }
  onSearch() {
    this.fetchProducts();
  }
  onReset() {
    this.storeData.search = '';
    this.storeData.selectedBrand = { id: 0, name: 'All' };
    this.storeData.selectedType = { id: 0, name: 'All' };
    this.storeData.selectedSort = 'asc';
    this.fetchProducts();
  }
}
