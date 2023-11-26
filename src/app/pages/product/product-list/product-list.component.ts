import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/authentication.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Product } from 'src/app/shared/models/product.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  isLoading: boolean | undefined;
  productList: Observable<Product[]> | undefined;
  cartList: Product[] | any;
  currentUser: User | any;

  cartSubscription: Subscription | undefined;

  constructor(private productService: FirebaseService<Product>,
    private userService: FirebaseService<User>,
    private toastr: ToastrService, private router: Router,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getProducts();
    this.auth.currentUser().then((user: any) => {
      this.userService.getByEmail('Users', user.email).subscribe(
        (result: any) => {
          this.currentUser = result[0];
          this.getCart();
        },
        error => { }
      );
    })
      .then(() => this.isLoading = false);
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  getProducts(): void {
    this.productList = this.productService.get('product_list');;
  }

  getCart(): void {
    this.cartSubscription = this.userService.getById('Users', this.currentUser.id).subscribe(
      (result: any) => {
        this.cartList = [];
        if (result?.cartList !== undefined) {
          this.cartList = result.cartList;
        }
      }
    );
  }

  updateCart(new_product: Product): void {
    if (new_product.inCart) {
      this.cartList?.unshift(new_product);
    } else {
      this.cartList = this.cartList.filter((product: Product) => product.id !== new_product.id);
    }
    this.currentUser.cartList = this.cartList;
    this.userService.update('Users', this.currentUser.id, this.currentUser)
      .then(() => {
        if (new_product.inCart) {
          this.toastr.success(new_product.name + " has been added to your cart!");
        } else {
          this.toastr.warning(new_product.name + " has been removed from your cart!")
        }
      });
  }

}
