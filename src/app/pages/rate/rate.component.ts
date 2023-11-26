import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/authentication.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent implements OnInit {

  comments: any;
  currentUser = '';
  averageStars: any;
  refreshStars = 1;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { product: Product },
    private auth: AuthService, private service: FirebaseService<Product>,
    public dialogRef: MatDialogRef<Product>,) { }

  form: FormGroup = new FormGroup({
    comment: new FormControl('', Validators.required),
    stars: new FormControl()
  });

  ngOnInit(): void {
    this.auth.currentUser().then(
      (user: any) => this.currentUser = user.displayName
    );
    this.getRatings();
  }

  getRatings() {
    this.comments = this.data.product.rating;
    let sum = 0;
    let no_rate = 0;
    if (this.comments !== undefined) {
      this.comments.map(
        (rating: any) => {
          if (rating.stars !== null) {
            sum += rating.stars;
          } else {
            no_rate++;
          }
        }
      );
      this.averageStars = sum / (this.comments.length - no_rate);
    }
  }

  writeComment(): void {
    if (this.data.product.rating === undefined) {
      this.data.product.rating = [];
    }
    this.data.product.rating.unshift({
      writer: this.currentUser,
      comment: this.form.value.comment,
      stars: this.form.value.stars === -1 || this.form.value.stars === '' ? null : this.form.value.stars,
      date: new Date().toLocaleString()
    });
    this.refreshStars = 0;
    this.getRatings();
    this.service.update('product_list', this.data.product.id, this.data.product).
      then(() => {
        this.form.controls.comment.setValue('');
        this.form.controls.stars.setValue('');
      })
      .then(() => {
        this.refreshStars = 1;
      });
  }

  pickStar(event: any): void {
    this.form.controls.stars.setValue(event.newValue);
  }

}
