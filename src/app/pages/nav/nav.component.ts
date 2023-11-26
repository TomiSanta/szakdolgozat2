import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentication.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { CATEGORIES } from 'src/app/shared/database/categories.database';
import { Category } from 'src/app/shared/models/category.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  categories = CATEGORIES;
  profile: Category = {
    title: 'profile',
    icon: 'person',
    value: 'profile',
    color: '#CF0500',
    url: '/home/profile'
  }
  currentUser: any;

  constructor(private router: Router, private auth: AuthService,
    private fbService: FirebaseService<User>) { }

  ngOnInit(): void {
    this.auth.currentUser().then((user: any) => this.currentUser = user.displayName);
  }

  logOut(): void {
    this.router.navigateByUrl('login');
    this.auth.logout();
  }

}
