import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';



@NgModule({
  imports: [
    CommonModule,
    StoreComponent
  ],
  exports: [StoreComponent]
})
export class StoreModule { }
