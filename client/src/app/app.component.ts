import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { SectionHeaderComponent } from './core/section-header/section-header.component';
import { NgxSpinnerComponent } from "ngx-spinner";
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, CommonModule, SectionHeaderComponent, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Sports Center';
  constructor(private basketService: BasketService) {}
  ngOnInit() {
    const basketId =  localStorage.getItem('basket-id');
    if(basketId) this.basketService.getBasket(basketId);
  }
}

