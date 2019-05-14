import { UserService } from '../user.service';
import { User } from '../user.model';
import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'add-user-root',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  constructor(
    private user: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ){}
   usersList: User[] = [];
   form: FormGroup;
  errorMessage: string;
   ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3) ]
      }),
      place: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(4)]
      }),
      phone: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(10)]
      }),
    });
   }

addUser = () => {
      if (this.form.invalid) {
        this.errorMessage = 'Form is invalid';
        return;
      }
      this.user.addUser(this.form.value.name,this.form.value.place, this.form.value.phone);
      this.router.navigate(['/users']);
      this.snackBar.open('Added Successfully', ' ' , { duration: 2000});
   }
}

