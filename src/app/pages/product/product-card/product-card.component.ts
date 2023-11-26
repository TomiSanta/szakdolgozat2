import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/models/product.model';
import { RateComponent } from '../../rate/rate.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit, OnChanges {

  @Input() product!: Product;
  @Input() cartList!: Product[] | undefined;
  @Output() callUpdateCart = new EventEmitter<Product>();
  inCart: boolean | undefined;

  constructor(private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.inCart = false;
    this.cartList?.map(item => {
      if (item.id === this.product.id) {
        this.inCart = true;
        return;
      }
    });
  }

  ngOnInit(): void {
  }

  updateCart(event: any): void {
    event.stopPropagation();
    if (this.inCart) {
      this.product.amount = 0;
    } else {
      this.product.amount = 1;
    }
    this.product.inCart = !this.inCart;
    this.callUpdateCart.emit(this.product);
  }

  openRating(): void {
    this.dialog.open(RateComponent, {
      data: { product: this.product },
      width: '90vw',
      height: '90vh',
    });
  }

}
