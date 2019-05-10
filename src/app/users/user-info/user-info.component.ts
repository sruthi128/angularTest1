import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../login/login.service';
import { Observable, Subscriber, Subscription } from 'rxjs';

import { UserService } from '../user.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'user-info-root',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit, OnDestroy{


  constructor(
    private http: HttpClient,
    private loginStatus: LoginService,
    private favList: UserService,
    public route: ActivatedRoute
  ){}

  private loginSub: Subscription;
  isLoggedIn = false;
  isLoading = false;
   userInfoList = [ ];
   userId = '';
   //favouritesList = [  ];

  /*  userArray = this.userMasterArray.map((item) => {
    const resp = {
      name: item.name,
      place: item.place.name +" (" +item.place.population+")"
    };
    return resp;
  });*/


  ngOnInit() {
    this.isLoggedIn = this.loginStatus.getLoggedIn();
    this.loginSub = this.loginStatus.getLoginStatusListener().subscribe((loginState) => {
      this.isLoggedIn = loginState;
    }
    );

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('userId')) {
        this.userId = paramMap.get("userId");
        this.isLoading = true;
        this.http.get('https://api.github.com/users/'+ this.userId)
        .subscribe((httpData: Array<any>) => {
          for(let item of Object.entries(httpData)) {
            this.userInfoList.push(
              {
                name: item[0],
                value: item[1]
              }
            );
          }
          this.isLoading = false;

        });
      }
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

