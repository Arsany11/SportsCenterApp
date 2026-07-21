import { Component } from '@angular/core';
import { BreadcrumbComponent, BreadcrumbService,  BreadcrumbItemDirective } from 'xng-breadcrumb';
import {TitleCasePipe,CommonModule} from '@angular/common';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [BreadcrumbComponent , TitleCasePipe,CommonModule, BreadcrumbItemDirective],
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.scss'
})
export class SectionHeaderComponent {
  constructor(public breadCrumbService: BreadcrumbService) {}
}
