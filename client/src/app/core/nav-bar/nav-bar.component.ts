import { Component , OnInit} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BasketService } from '../../basket/basket.service';
import { CommonModule } from '@angular/common';
import { Basket, BasketItem } from '../../shared/models/basket';
import { AccountService } from '../../account/account.service';
import { User } from '../../shared/models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  currentUser$? : Observable<User | null>;
  basketSource$?: Observable<Basket | null>;
  constructor(public basketService: BasketService,
              public accountService: AccountService
  ) {}
  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.basketSource$ = this.basketService.basketSource$;
  }

  getItemsCount(items: BasketItem[]) {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }
  logout(){
    this.accountService.logout();
  }
}
