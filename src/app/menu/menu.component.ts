import { Component, OnInit, OnDestroy } from '@angular/core';
import { BodyComponent } from '../body/body.component';
import { BodyService } from '../body/body.service';
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
  textClicked:string = "Click any link";
  link(id: string){
    this.textClicked=id
  }
  constructor(
    private favList: BodyService,
    private loginStatus: LoginService
  ){}
  ngOnInit(){
    this.favSub = this.favList.favListObservable.subscribe(favouritesList => this.favouritesList = favouritesList);
    this.loginStatus.getLoginStatusListener().subscribe(loggedIn => this.loggedIn = loggedIn);
  }

  ngOnDestroy() {
    this.favSub.unsubscribe();
  }
}
