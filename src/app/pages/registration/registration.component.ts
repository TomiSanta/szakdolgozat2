import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/authentication.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { COUNTRIES } from 'src/app/shared/database/countries.database';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  error: boolean = false;
  isLoading: boolean = false;
  countries = COUNTRIES;
  form: FormGroup = new FormGroup({
    fullName: new FormControl(),
    email: new FormControl('', [Validators.required, Validators.email]),
    nickname: new FormControl(''),
    password: new FormControl('', Validators.required),
    re_password: new FormControl('', Validators.required),
    phoneNumber: new FormControl(''),
    country: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    cartList: new FormControl([]),
  });

  constructor(private router: Router, private auth: AuthService,
    private toastr: ToastrService, private fbService: FirebaseService<User>) { }

  registration(): void {
    this.isLoading = true;
    if (this.form.valid && this.form.value.password === this.form.value.re_password) {
      this.auth.createUser(this.form.value.email.toLowerCase(), this.form.value.password,
        (this.form.value.nickname ? this.form.value.nickname : this.form.value.email.split("@")[0]))
        .then(
          () => this.auth.login(this.form.value.email.toLowerCase(), this.form.value.password)
            .then(
              () => {
                let lower_case_email = this.form.value.email.toLowerCase();
                this.form.controls.email.setValue(lower_case_email);
                this.fbService.add("Users", this.form.value)
                  .then(
                    result => {
                      this.toastr.success("Succesful registration!");
                      this.router.navigateByUrl('/home');
                    },
                    error => this.error = true
                  );
              },
              error => this.error = true
            ),
          error => this.error = true
        )
        .then(() => this.isLoading = false);
    } else {
      this.error = true;
      this.isLoading = false;
    }
  }

}
