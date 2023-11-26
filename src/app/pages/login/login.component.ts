import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isError: boolean = false;
  isLoading: boolean = false;
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required)
  });

  constructor(private router: Router, private auth: AuthService) { }

  @HostListener('document:keydown.enter') onKeydownHandler() {
    this.login();
  }

  ngOnInit(): void {
    this.auth.logout();
  }


  navigateTo(url: string): void {
    this.router.navigateByUrl(url);
  }

  login(): void {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.auth.login(this.form.value.email.toLowerCase(), this.form.value.password).then(
      result => {
        this.navigateTo('/home');
      },
      error => {
        this.isError = true;
      }
    )
      .then(() => this.isLoading = false);
  }

}
