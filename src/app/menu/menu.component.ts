import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../users/user.service';
import { LoginService } from '../login/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'menu-root',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  favouritesList = [  ];
  favSub: Subscription;
  loggedIn;
  loginName;
  textClicked:string = "Click any link";
  link(id: string){
    this.textClicked=id
  }
  constructor(
    private favList: UserService,
    private loginStatus: LoginService
  ){}
  ngOnInit(){
    this.favSub = this.favList.favListObservable.subscribe(favouritesList => {
      this.favouritesList = favouritesList;
    });
    this.loggedIn = this.loginStatus.getLoggedIn();
    this.loginStatus.getLoginStatusListener().subscribe(loggedIn => this.loggedIn = loggedIn);

    this.loginName = this.loginStatus.getLoginName();
    this.loginStatus.getLoginNameListener().subscribe(loginName => this.loginName = loginName);
    console.log(this.loggedIn);
    console.log(this.loginName);
  }

  ngOnDestroy() {
    this.favSub.unsubscribe();
  }
}
