import { Component } from '@angular/core';
import { CurrencyPipe ,CommonModule} from '@angular/common';
import { BasketService } from '../../../basket/basket.service';


@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss'
})
export class OrderSummaryComponent {
  constructor(public basketService: BasketService) {}

}
