import { Component, Input } from '@angular/core';
import { Product } from '../../shared/models/product';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
@Input() product: Product | null = null;

constructor(private basketServices: BasketService) { }

addItemToBasket(){
  this.product && this.basketServices.addItemToBasket(this.product);
}
// get the image name from url
extractImageName():String | null{
  if(this.product && this.product.pictureUrl){
    const parts = this.product.pictureUrl.split('/');
    if(parts.length > 0){
      return parts[parts.length - 1];// to return the last part
    }
  }
return null; // if it's invalid 
}
}
