import { Component, OnInit } from '@angular/core';
import { Basket, BasketItem } from '../../shared/models/basket';
import { BasketService } from '../../basket/basket.service';
import { Route, Router } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-review',
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss',
})
export class ReviewComponent implements OnInit {
  basket: Basket | null = new Basket();

  constructor(
    public basketService: BasketService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.basketService.basketSource$.subscribe((basket) => {
      this.basket = basket;
    });
  }
  extractImageName(item: BasketItem): string | null {
    if (item && item.pictureUrl) {
      const parts = item.pictureUrl.split('/');
      if (parts.length > 0) {
        return parts[parts.length - 1];
      }
    }
    return null;
  }
  submitOrder(){
    this.basketService.clearBasket();
    this.router.navigate(['/store']);
  }
}
