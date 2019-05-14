import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../../login/login.service';
import { Observable, Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'list-organization-root',
  templateUrl: './list-organization.component.html',
  styleUrls: ['./list-organization.component.css']
})
export class ListOrganizationComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private loginStatus: LoginService,
  ){
  }
  isLoggedIn = false;

 // displayedColumns: string = ['name', 'value'];

  ngOnInit() {
   this.isLoggedIn = this.loginStatus.getLoggedIn();

   this.http.get('http://asdfasdf.com:3000/v1/organizations')
  .subscribe((httpData: any) => {
    console.log(httpData);
   // for (let item of httpData) {
      // this.usersList.push(item)

     //}
  },
   );
  }
}
