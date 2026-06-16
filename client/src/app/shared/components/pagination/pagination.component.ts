import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule,PaginationModule,FormsModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
@Input() totalElements: number = 0;
@Input() pageSize: number = 10;
@Input() currentPage: number = 1;
@Output() pageChanged = new EventEmitter();
}
