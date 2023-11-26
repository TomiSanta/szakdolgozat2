import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { ProductListRoutingModule } from './product-list-routing.module';
import { ContainerModule } from 'src/app/shared/components/container/container.module';
import { ProductCardModule } from '../product-card/product-card.module';
import { OnHoverModule } from 'src/app/shared/directives/on-hover/on-hover.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { OrderModule } from '../../order/order.module';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
  declarations: [
    ProductListComponent
  ],
  imports: [
    CommonModule,
    ProductListRoutingModule,
    ContainerModule,
    ProductCardModule,
    OnHoverModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatButtonModule,
    OrderModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ProductListComponent]
})
export class ProductListModule { }
