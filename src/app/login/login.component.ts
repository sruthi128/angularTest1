import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login/login.service';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';


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
  errorMessage = '';
  form: FormGroup;
  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(4)]
      }),
    });

    if(localStorage.getItem('username')) {
      this.isLoggedIn = true;
      this.loginStatus.doLogin(localStorage.getItem('username'));
    }
    else {
      this.isLoggedIn = this.loginStatus.getLoggedIn();
      this.loginSub = this.loginStatus.getLoginStatusListener().subscribe((loginState) => {
        this.isLoggedIn = loginState;
        }
      );
    }


  }
  onLogin = () => {
    if (this.form.invalid) {
      this.errorMessage = 'Form is invalid';
      return;
    }
    const username = this.form.value.username;
    const password = this.form.value.password;

    const reqBody = {
      "username": username,
      "password": password
    };
    this.http.post('http://events.tvasiausa.com:3000/v1/loginAdmin',reqBody)
    .subscribe((httpData: any) => {
        //this.isLoading = false;
        if(httpData.token) {
          localStorage.setItem('token',httpData.token);
          this.isLoggedIn = true;
          this.loginStatus.doLogin(username);
        } else {
          this.errorMessage = 'Invalid Credentials';
        }
      });


    // if(username == "admin" && password == "admin"){

    //   this.isLoggedIn = true;
    //   this.loginStatus.doLogin(username);
    // }
    // else if(username == "user" && password == "user"){

    //   this.isLoggedIn = true;
    //   this.loginStatus.doLogin(username);
    //  }
    // else {
    // this.errorMessage = 'Invalid Credentials';
    // }
  }
  ngOnDestroy(): void {
    if(this.loginSub)
      this.loginSub.unsubscribe();
  }
}

