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
    console.log(loginName)
    this.isLoggedIn = true;
    this.loginStatusListener.next(this.isLoggedIn)
    this.loginNameListener.next(loginName)
  }

  doLogout() {
    this.isLoggedIn = false;
    this.loginStatusListener.next(this.isLoggedIn)
    this.router.navigate(["/"]);
  }

}
