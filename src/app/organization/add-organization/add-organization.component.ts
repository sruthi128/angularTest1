import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../../login/login.service';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'add-organization-root',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.css']
})
export class AddOrganizationComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private loginStatus: LoginService,
  ){
  }
  isLoggedIn = false;
  form: FormGroup;
  errorMessage: string;

  ngOnInit() {
    this.isLoggedIn = this.loginStatus.getLoggedIn();
    this.form = new FormGroup({
     orgName: new FormControl(null, {
       validators: [Validators.required, Validators.minLength(3)]
     })
   });

   console.log("oninit ", +this.form.value.orgName)
 }
  addOrganization = () =>{
    if (this.form.invalid) {
      this.errorMessage = 'Form is invalid';
      return;
    }

    console.log("add org function", +this.form.value.orgName)
    const reqBody = {
      name: this.form.value.orgName
    };
    this.http.post('http://asdfsadfsadf.com/v1/organizations', reqBody)
    .subscribe((httpData: any) => {
      console.log('GVK Success',httpData);
      localStorage.setItem('message',httpData.message);
   },
    errorData => {
      console.log('GVK Failed',errorData);
    }
     );
  }


}
