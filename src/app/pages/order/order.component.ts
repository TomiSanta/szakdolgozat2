import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/authentication.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { PAYMENT_METHODS } from 'src/app/shared/database/payment-methods.database';
import { Product } from 'src/app/shared/models/product.model';
import { User } from 'src/app/shared/models/user.model';
import { HufToIntPipe } from 'src/app/shared/pipes/hufToInt/huf-to-int.pipe';
import { IntToHufPipe } from 'src/app/shared/pipes/intToHuf/int-to-huf.pipe';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {

  fullPrice = '';
  deliveryFee = '500 Ft'
  total = '';

  delivery = 'Utánvétel (+500 Ft)';
  cartList: Observable<Product[]> | undefined;
  fill: boolean = false;

  userDataSubscription: Subscription | undefined;

  payment_methods = PAYMENT_METHODS;
  form: FormGroup = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    description: new FormControl(''),
    fullPrice: new FormControl(this.fullPrice, Validators.required),
    delivery: new FormControl('', Validators.required),
    total: new FormControl('', Validators.required),
  })

  constructor(private firebaseService: FirebaseService<Product>,
    public dialogRef: MatDialogRef<OrderComponent>,
    private userService: FirebaseService<User>,
    private auth: AuthService,
    private intToHufPipe: IntToHufPipe,
    private hufToIntPipe: HufToIntPipe
  ) { }

  ngOnInit(): void {
    this.countFullPrice();
  }

  ngOnDestroy(): void {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }

  countFullPrice(): void {
    this.auth.currentUser().then((user: any) => {
      this.userService.getByEmail('Users', user.email).subscribe(
        (result: any) => {
          let full_price = 0;
          result[0].cartList.map((product: Product) => {
            let amount = product.amount;
            full_price += this.hufToIntPipe.transform(product.price) * amount;
          });
          this.fullPrice = this.intToHufPipe.transform(full_price);
          this.selectDelivery();
        },
        error => { }
      );
    });
  }

  fillInputs(): void {
    this.fill = !this.fill;
    if (this.fill) {
      this.auth.currentUser().then((user: any) => {
        this.userDataSubscription = this.userService.getCurrentUser('Users', user.email).subscribe(
          result => {
            result.map(user => {
              this.form.controls.fullName.setValue(user.fullName);
              this.form.controls.email.setValue(user.email.toLowerCase());
              this.form.controls.phoneNumber.setValue(user.phoneNumber);
              this.form.controls.address.setValue(user.country + ', ' + user.address);
            });
          },
          error => { }
        );
      });
    } else {
      this.form.controls.fullName.setValue('');
      this.form.controls.email.setValue('');
      this.form.controls.phoneNumber.setValue('');
      this.form.controls.address.setValue('');
    }
  }

  selectDelivery(): void {
    switch (this.delivery) {
      case "Utánvétel (+500 Ft)": {
        this.deliveryFee = '500 Ft';
        let new_total = this.hufToIntPipe.transform(this.fullPrice) + 500;
        this.total = this.intToHufPipe.transform(new_total);
        break;
      }
      case "Bankkártyás fizetés (Ingyenes)": {
        this.deliveryFee = '0 Ft';
        this.total = this.fullPrice;
        break;
      }
      default: {
        this.deliveryFee = '1000 Ft';
        let new_total = this.hufToIntPipe.transform(this.fullPrice) + 1000;
        this.total = this.intToHufPipe.transform(new_total);
        break;
      }
    }
  }

}
