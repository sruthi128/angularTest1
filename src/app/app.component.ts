import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserListComponent } from './users/user-list/user-list.component';
import { LoginService } from './login/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private loginStatus: LoginService,
  ){}
  title = 'Hi';
  private loginSub: Subscription;
  isLoggedIn = false;

  ngOnInit() {
    this.isLoggedIn = this.loginStatus.getLoggedIn();
    this.loginSub = this.loginStatus.getLoginStatusListener().subscribe((loginState) => {
      this.isLoggedIn = loginState;
      }
    );
  }

  ngOnDestroy(): void {
    this.loginSub.unsubscribe();
  }
}
