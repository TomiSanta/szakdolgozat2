import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  login(email: string, password: string): Promise<any> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout(): Promise<void> {
    await this.auth.signOut();
  }

  authenticated(): boolean {
    return this.auth.authState !== null;
  }

  currentUser(): any {
    return this.auth.currentUser;
  }

  currentUserObservable(): any {
    return this.auth.authState;
  }

  async createUser(email: string, password: string, name: string) {
    return this.auth.createUserWithEmailAndPassword(email, password).then((result) => {
      this.updateDisplayName(name);
      return result.user;
    });
  }

  async updateDisplayName(name: string) {
    return this.auth.currentUser.then((user) => {
      return user?.updateProfile({
        displayName: name
      });
    });
  }

}
