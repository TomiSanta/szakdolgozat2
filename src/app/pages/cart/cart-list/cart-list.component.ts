import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/authentication.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Order } from 'src/app/shared/models/order.model';
import { Product } from 'src/app/shared/models/product.model';
import { User } from 'src/app/shared/models/user.model';
import { OrderComponent } from '../../order/order.component';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit, OnDestroy {

  currentUser: User | any;
  isLoading: boolean = false;
  inCartProducts: Product[] | undefined;

  inCartSubscription: Subscription | undefined;

  constructor(private productService: FirebaseService<Product>,
    private orderService: FirebaseService<Order>,
    private userService: FirebaseService<User>,
    private router: Router, private dialog: MatDialog,
    private toastr: ToastrService, private auth: AuthService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.auth.currentUser()
      .then((user: any) => {
        this.userService.getByEmail('Users', user.email).subscribe(
          (result: any) => {
            this.currentUser = result[0];
            this.getInCartProducts();
          },
          error => { }
        );
      })
      .then(() => this.isLoading = false);
  }

  ngOnDestroy(): void {
    this.inCartSubscription?.unsubscribe();
  }

  getInCartProducts(): void {
    this.inCartSubscription = this.userService.getById('Users', this.currentUser.id).subscribe(
      (result: any) => {
        if (result?.cartList !== undefined) {
          this.inCartProducts = result.cartList;
        }
      }
    );
  }

  updateCart(product: Product): void {
    if (product.inCart) {
      this.inCartProducts?.map((item) => {
        if (item.id === product.id) {
          item = product;
        }
      });
    } else {
      this.inCartProducts = this.inCartProducts?.filter((filter) => product.id !== filter.id);
    }
    this.currentUser.cartList = this.inCartProducts;
    this.userService.update('Users', this.currentUser.id, this.currentUser)
      .then(() => {
        if (product.amount !== 0) {
          this.toastr.info("Successful update!")
        } else {
          this.toastr.warning(product.name + " has been removed from your cart!")
        }
      });
    return;
  }

  async updateProduct(product: Product): Promise<void> {
    await this.productService.update('product_list', product.id, product)
      .then(() => this.updateCart(product));
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(OrderComponent, {
      width: '80vw',
      height: '70vh',
      maxWidth: '600px',
    });
    dialogRef.afterClosed().subscribe(
      (order: Order) => {
        if (order !== undefined) {
          order.orderList = this.inCartProducts!;
          order.orderDate = new Date().toLocaleString();
          this.orderService.add("Orders", order)
            .then(() => this.resetCart())
            .then(() => {
              this.toastr.success(order.fullName + ", your order was succesful!", "Thank you!");
              this.router.navigateByUrl('/home/products');
            });
        }
      },
      error => { }
    );
  }

  resetCart(): void {
    let deletedArray: Array<string> = [];
    this.productService.get('product_list').subscribe(
      result => {
        result.map((product: Product) => {
          this.inCartProducts?.map(async (item: Product) => {
            if (product.id === item.id && deletedArray.indexOf(product.id) === -1) {
              product.inStock -= item.amount;
              deletedArray.push(product.id);
              await this.updateProduct(product);
            }
          })
        });
      },
      error => { }
    );
  }

}
