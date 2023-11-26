import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { IntToHufPipe } from 'src/app/shared/pipes/intToHuf/int-to-huf.pipe';
import { HufToIntModule } from 'src/app/shared/pipes/hufToInt/huf-to-int.module';



@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [CartComponent],
  providers: [
    IntToHufPipe,
    HufToIntModule
  ]
})
export class CartModule { }
