import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HttpClient } from '@angular/common/http';
import { NgClass, NgForOf } from '@angular/common';
import { Product } from './models/product';
import { ProductData } from './models/productData';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, NgClass, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Sports Center';
  products: Product[] = [];
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http.get<ProductData>('http://localhost:8080/api/products').subscribe({
      next: (data) => {
        this.products = data.content;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }
}

