import { Component, OnInit, Input } from '@angular/core';
import { StoreService } from './store.service';
import { Product } from '../shared/models/product';
import { CommonModule } from '@angular/common';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';

@Component({
  selector: 'app-store',
  imports: [CommonModule],
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

  @Input() title: string = '';
  ngOnInit() {
    // initialize selected brand ant type
    this.selectedBrand = null;
    this.selectedType = null;

    this.fetchProducts();
    this.getBrands();
    this.getTypes(); 
  }
  fetchProducts() {
    this.storeServices.getProducts().subscribe({
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
      next: (response)=>(this.brands =[{id: 0,name:'All'}, ...response]),
      error: (error) => console.log(error)
    });
  }
  getTypes() {
    this.storeServices.getTypes().subscribe({
      next: (response)=>(this.types =[{id: 0,name:'All'}, ...response]),
      error: (error) => console.log(error)
    });
    }
  selectBrand(brand : Type){
    // uppdate the selected brand then fetch the products
    this.selectedBrand = brand;
    this.fetchProducts();
  }

  selectType(type : Type){
    // uppdate the selected brand then fetch the products
    this.selectedType = type;
    this.fetchProducts();
  }

}
