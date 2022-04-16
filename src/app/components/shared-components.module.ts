import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SwipeItemComponent } from './swipe-item/swipe-item.component';



@NgModule({
  declarations: [SwipeItemComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    SwipeItemComponent
  ]
})
export class SharedComponentsModule { }
