import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'employees-list-root',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesListComponent implements OnInit, OnDestroy{


  constructor(
    private employee: EmployeeService
  ){}

  private loginSub: Subscription;
  isLoggedIn = false;
  isLoading = false;
  employeesList: Employee[] = [];
  form: FormGroup;
  addEmployee = (id: string, name: string, salary: string) => {
    this.employeesList.push(
      {
        employeeId: id,
       employeeName: name,
       emloyeeSalary : salary
      }
    );
  }
  ngOnInit() {
    this.form = new FormGroup({
    id: new FormControl(null, {
      validators: [Validators.required, Validators.length(6)]
    }),
    name: new FormControl(null, {
      validators: [Validators.required, Validators.minLength(3)]
    }),
    salary: new FormControl(null, {
      validators: [Validators.required, Validators.]
    })
  });
  }
  ngOnDestroy(): void {
    this.loginSub.unsubscribe();
  }
}

