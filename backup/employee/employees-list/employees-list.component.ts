import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../login/login.service';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';

@Component({
  selector: 'add-employee-root',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy{


  constructor(
    private http: HttpClient,
    private loginStatus: LoginService,
  ){}

  private loginSub: Subscription;
  isLoggedIn = false;
  isLoading = false;
  employeeList: Employee[] = [];
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
    this.http.get('http://dummy.restapiexample.com/api/v1/employees')
    .subscribe((httpData: Array<any>) => {
      for(let item of httpData) {
        this.employeeList.push(
          {
            id: item.login,
            name: item.employee_name,
            salary: item.employee_salary
          }
        );
      }
      this.isLoading = false;
    });
  }
  ngOnDestroy(): void {
    this.loginSub.unsubscribe();
  }
}

