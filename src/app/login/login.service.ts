import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class LoginService {
  constructor(
    private router: Router
  ){}
  private loginStatusListener = new Subject<boolean>();
  private loginNameListener = new Subject<string>();
  isLoggedIn = false;
  loginName = ''
  getLoginStatusListener() {
    return this.loginStatusListener.asObservable();
  }
  getLoginNameListener() {
    return this.loginNameListener.asObservable();
  }
  getLoginName() {
    return this.loginName;
  }
  getLoggedIn() {
    return this.isLoggedIn;
  }
  doLogin(loginName) {
    console.log(loginName);
    localStorage.setItem('username', loginName);
    this.isLoggedIn = true;
    this.loginName = loginName;
    this.loginStatusListener.next(this.isLoggedIn)
    this.loginNameListener.next(loginName);
    this.router.navigate(["/home"]);
  }

  doLogout() {
    localStorage.removeItem('username');
    this.isLoggedIn = false;
    this.loginName = '';
    this.loginStatusListener.next(this.isLoggedIn)
    this.router.navigate(["/login"]);
  }

  getStoredToken() {
    return localStorage.getItem('token');
  }

}
