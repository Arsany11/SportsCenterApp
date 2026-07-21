import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { StoreService } from '../store.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe, NgIf } from '@angular/common';
import { BreadcrumbService } from 'xng-breadcrumb';
@Component({
  selector: 'app-product-details',
  imports: [NgIf, CurrencyPipe,RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;
  quantity: number = 1;

  constructor(
    private storeService: StoreService,
    private activatedRoute: ActivatedRoute,
    private breadcrumb: BreadcrumbService
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.storeService.getProduct(+id).subscribe({
        next: (product) => {
          this.product = product;
          this.breadcrumb.set('@ProductName', product.name);
        },
      
        error: (error) => console.log(error),
      });
    }
  }
  extractImageName(): string | null {
    if (this.product && this.product.pictureUrl) {
      const parts = this.product.pictureUrl.split('/');
      if (parts.length > 0) {
        return parts[parts.length - 1];
      }
    }
    return null;
  }
  incrementQuantity(){
    this.quantity++;
  }
  decrementQuantity(){
    if(this.quantity > 1){
      this.quantity--;
    }
  }
}
