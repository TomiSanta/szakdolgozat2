import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartListComponent } from './cart-list.component';
import { CartModule } from '../cart-card/cart.module';
import { ContainerModule } from 'src/app/shared/components/container/container.module';
import { OnHoverModule } from 'src/app/shared/directives/on-hover/on-hover.module';
import { CartListRoutingModule } from './cart-list-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { IntToHufModule } from 'src/app/shared/pipes/intToHuf/int-to-huf.module';
import { HufToIntModule } from 'src/app/shared/pipes/hufToInt/huf-to-int.module';



@NgModule({
  declarations: [
    CartListComponent
  ],
  imports: [
    CommonModule,
    CartModule,
    ContainerModule,
    OnHoverModule,
    CartListRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    CartListRoutingModule,
    IntToHufModule,
    HufToIntModule
  ],
  exports: [CartListComponent]
})
export class CartListModule { }
