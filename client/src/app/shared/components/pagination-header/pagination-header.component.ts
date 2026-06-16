import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination-header',
  imports: [CommonModule],
  templateUrl: './pagination-header.component.html',
  styleUrl: './pagination-header.component.scss'
})
export class PaginationHeaderComponent {
  @Input() totalElements: number = 0;
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 10;
}
