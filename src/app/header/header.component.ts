import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'header-root',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  /* implements OnInit{
  ngOnInit(): void {
    this.timerEnabled = true;
    this.runTimer();
  }*/
  title = 'Hi';
  titleClassName = "titleDefault";
  timerEnabled = false;
  loggedIn = false;

  runTimer = () => {
    if(this.timerEnabled) {
      setTimeout(() => {
        if(this.titleClassName=="titleDefault")
          this.titleClassName= "titleRed"
        else
          this.titleClassName= "titleDefault"
        this.runTimer();
      },200);
    }
  }

  onLoginOrLogout = () => {
    //this.titleClassName= "titleRed"
    if(this.timerEnabled)
      this.timerEnabled = false;
    else
      this.timerEnabled = true;
    this.runTimer();


    if(this.loggedIn)
      this.loggedIn = false;
    else
      this.loggedIn = true;
  }


}
