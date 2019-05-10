import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: "root" })
export class LoginService {
  private loginStatusListener = new Subject<boolean>();
  isLoggedIn = false;

  getLoginStatusListener() {
    return this.loginStatusListener.asObservable();
  }
  getLoggedIn() {
    return this.isLoggedIn;
  }
  doLogin() {
    this.isLoggedIn = true;
    this.loginStatusListener.next(this.isLoggedIn)
  }

  doLogout() {
    this.isLoggedIn = false;
    this.loginStatusListener.next(this.isLoggedIn)
  }

}
