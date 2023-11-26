import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Product } from 'src/app/shared/models/product.model';
import { HufToIntPipe } from 'src/app/shared/pipes/hufToInt/huf-to-int.pipe';
import { IntToHufPipe } from 'src/app/shared/pipes/intToHuf/int-to-huf.pipe';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnChanges {

  @Input() product!: Product;
  @Output() callUpdateCart = new EventEmitter<Product>();
  amount: number | any;
  actualPrice: number | any;

  constructor(private service: FirebaseService<Product>,
    private intToHufPipe: IntToHufPipe,
    private hufToIntPipe: HufToIntPipe) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.amount = this.product.amount;
    let price_int = this.hufToIntPipe.transform(this.product.price) * this.amount;
    this.actualPrice = this.intToHufPipe.transform(price_int);
  }

  ngOnInit(): void { }

  removeFromCart(): void {
    this.amount = 0;
    this.product.inCart = false;
    this.product.amount = 0;
    this.updateCart();
  }

  addAmount() {
    if (this.amount < this.product.inStock) {
      this.amount++;
      this.product.amount = this.amount;
      this.updateCart();
    }
  }

  removeAmount() {
    if (this.amount > 1) {
      this.amount--
      this.product.amount = this.amount;
      this.updateCart();
      return;
    }
    this.removeFromCart();
  }

  updateCart(): void {
    this.callUpdateCart.emit(this.product);
  }

}
