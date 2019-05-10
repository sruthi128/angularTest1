import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login/login.service';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { BodyService } from './body.service';

@Component({
  selector: 'body-root',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit, OnDestroy{


  constructor(
    private http: HttpClient,
    private loginStatus: LoginService,
    private favList: BodyService
  ){}

  private loginSub: Subscription;
  isLoggedIn = false;
  isLoading = false;
   usersList = [ ];
   //favouritesList = [  ];

  /*  userArray = this.userMasterArray.map((item) => {
    const resp = {
      name: item.name,
      place: item.place.name +" (" +item.place.population+")"
    };
    return resp;
  });*/
  onsubmit = (argName: string, argPlace: string, argPhone: string) => {
    this.usersList.push(
      {
      name : argName,
      place : argPlace,
      phone : argPhone
      }
    );
  }
  onDelete = (user) => {
    this.usersList.splice(this.usersList.indexOf(user), 1);
  }

  ngOnInit() {
    this.isLoggedIn = this.loginStatus.getLoggedIn();
    this.loginSub = this.loginStatus.getLoginStatusListener().subscribe((loginState) => {
      this.isLoggedIn = loginState;
    }
    );

    this.isLoading = true;
    this.http.get('https://api.github.com/users/hadley/orgs')
    .subscribe((httpData: Array<any>) => {
      for(let item of httpData) {
        this.usersList.push(
          {
            name: item.login,
            place: item.login,
            phone: item.id+''
          }
        );
      }
      this.isLoading = false;
    //   this.usersList.append(httpData.map((item) => {
    //     return {
    //       name: item.login,
    //       place: item.login,
    //       phone: item.id + ''
    //     };
    //   }));
    });
  }
  onLogin = (username:string, password:string) => {
    if(username == "admin" && password == "admin"){

      this.isLoggedIn = true;
      this.loginStatus.doLogin();
    }
  }
  moveToFav = (user) =>{
    //this.favouritesList.push(user)
    //this.favList.favListChange(this.favouritesList)
    this.favList.addFav(user);
  }
  ngOnDestroy(): void {
    this.loginSub.unsubscribe();
  }
}

