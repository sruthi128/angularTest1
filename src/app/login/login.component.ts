import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login/login.service';
import { Observable, Subscriber, Subscription } from 'rxjs';


@Component({
  selector: 'login-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{


  constructor(
    private http: HttpClient,
    private loginStatus: LoginService,
  ){}
  isLoggedIn = false;
  private loginSub: Subscription;

  ngOnInit() {
    this.isLoggedIn = this.loginStatus.getLoggedIn();
    this.loginSub = this.loginStatus.getLoginStatusListener().subscribe((loginState) => {
      this.isLoggedIn = loginState;
      }
    );

  }
  onLogin = (username:string, password:string) => {
    if(username == "admin" && password == "admin"){

      this.isLoggedIn = true;
      this.loginStatus.doLogin();
    }
  }

  ngOnDestroy(): void {
    this.loginSub.unsubscribe();
  }
}

