import { Injectable } from '@angular/core';
import { Basket, BasketItem, BasketTotals } from '../shared/models/basket';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  
  public apiUrl = 'http://localhost:8080/api/baskets';
  private basketSource = new BehaviorSubject<Basket | null>(null);
  basketSource$ = this.basketSource.asObservable();

  private basketTotalSource = new BehaviorSubject<BasketTotals>({
    subtotal: 0,
    shipping: 0,
    total: 0,
  });
  basketTotalSource$ = this.basketTotalSource.asObservable();
  constructor(private http: HttpClient) {}

  updateShippingPrice(shippingPrice: number): void {
    const updateBasketTotal = this.basketTotalSource.value;
    updateBasketTotal.shipping = shippingPrice;
    updateBasketTotal.total = updateBasketTotal.subtotal + shippingPrice;
    this.basketTotalSource.next(updateBasketTotal);
  }

  getBasket(id: string) {
    return this.http.get<Basket>(this.apiUrl + '/' + id).subscribe({
      next: (basket) => {
        (this.basketSource.next(basket), this.calculateTotals());
      },
    });
  }

  setBasket(basket: Basket) {
    return this.http.post<Basket>(this.apiUrl, basket).subscribe({
      next: (basket) => {
        (this.basketSource.next(basket), this.calculateTotals());
      },
    });
  }

  getCurrentBasket() {
    return this.basketSource.value;
  }

  addItemToBasket(item: Product, quantity : number) {
    const itemToAdd = this.mapProductToBasket(item);
    const basket = this.getCurrentBasket() ?? this.createBasket();
    basket.items = this.upsertItem(basket.items, itemToAdd, quantity);

    this.setBasket(basket);
  }

  upsertItem(
    items: BasketItem[],
    itemToAdd: BasketItem,
    quantity: number,
  ): BasketItem[] {
    const item = items.find((i) => i.id === itemToAdd.id);
    console.log(item);
    if (item) {
      item.quantity += quantity;
    } else {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }
    return items;
  }
  createBasket(): Basket {
    const basket = new Basket();
    localStorage.setItem('basket-id', basket.id);
    return basket;
  }

  removeItem(itemId: number) {
    const basket = this.getCurrentBasket();
    if (basket) {
      const itemmIndex = basket.items.findIndex((p) => p.id === itemId);
      if (itemmIndex !== -1) {
        basket.items.splice(itemmIndex, 1);
        this.setBasket(basket);
      }
      // check if basket become empty
      if (basket.items.length === 0) {
        localStorage.removeItem('basket-id');
      }
    }
  }

  decrementItemQuantity(itemId: number, quantity: number = 1) {
    const basket = this.getCurrentBasket();
    if (basket) {
      const item = basket.items.find((p) => p.id === itemId);
      if (item && item.quantity > 1) {
        item.quantity -= quantity;
        this.setBasket(basket);
      }
    }
  }
  incrementItemQuantity(itemId: number, quantity: number = 1) {
    const basket = this.getCurrentBasket();
    if (basket) {
      const item = basket.items.find((p) => p.id === itemId);
      if (item) {
        item.quantity += quantity;
        if (item.quantity < 1) {
          item.quantity = 1; //Prevent -ve quantity
        }
        this.setBasket(basket);
      }
    }
  }

  private calculateTotals() {
    const basket = this.getCurrentBasket();
    if (basket) {
      const shipping = 0; // Assuming shipping is fixed for now
      const subtotal = basket.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
      const total = subtotal + shipping;
      this.basketTotalSource.next({ shipping, subtotal, total });
    }
  }

  private mapProductToBasket(item: Product): BasketItem {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      pictureUrl: item.pictureUrl,
      productType: item.productType,
      productBrand: item.productBrand,
      quantity: 0,
    };
  }

    clearBasket() {
    this.basketSource.next(null);
    localStorage.removeItem('basket_id');
    localStorage.removeItem('basket');
  }

}
