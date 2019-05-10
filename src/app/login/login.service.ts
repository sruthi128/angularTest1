import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class LoginService {
  constructor(
    private router: Router
  ){}
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
    this.router.navigate(["/"]);
  }

}
