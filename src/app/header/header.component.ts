import { Component, OnInit } from '@angular/core';
import { timer, Subscription } from 'rxjs';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'header-root',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  private loginSub: Subscription;
  title = 'Hi';
    titleClassName = "titleDefault";
    timerEnabled = false;
    loggedIn = false;
    loginName = ''
  constructor(
    private loginStatus: LoginService
  ){ }
   ngOnInit(): void {
    this.loggedIn = this.loginStatus.getLoggedIn();
    this.loginSub = this.loginStatus.getLoginStatusListener().subscribe((loginState) => {
      this.loggedIn = loginState;
    } );

    this.loginName = this.loginStatus.getLoginName();
    this.loginSub = this.loginStatus.getLoginNameListener().subscribe((loginState) => {
      this.loginName = loginState;
    } );
  }
  /* implements OnInit{
  ngOnInit(): void {
    this.timerEnabled = true;
    this.runTimer();
  }*/
    runTimer = () => {
    if(this.timerEnabled) {
      setTimeout(() => {
        if(this.titleClassName=='titleDefault') {
          this.titleClassName= "titleRed"
        }
        else {
          this.titleClassName= "titleDefault"
        }
        this.runTimer();
      },200);
    }
  }
   onLogout = () => {
    if(this.timerEnabled) {
      this.timerEnabled = false;
    }
    else {
      this.timerEnabled = true;
    }
    this.runTimer();
    if(this.loggedIn) {
      this.loggedIn = false;
      this.loginStatus.doLogout();
    }
  }
}
