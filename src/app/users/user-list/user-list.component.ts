import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { User } from '../user.model';
import {MatDialog, MatDialogRef, PageEvent} from '@angular/material';

interface UserDisplayList extends User {
  rowClass: string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'user-list-root',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  constructor(
    private http: HttpClient,
    private userService: UserService,
    public dialog: MatDialog,
  ){

    //public dialogRef: MatDialogRef;
  }
  private loginSub: Subscription;
  isLoading = false;
   usersList: UserDisplayList[] = [];
   maxUsers = 50;
   pageSize = 5;
   pageSizeOptions: number[] = [5, 10, 25];
   currentPage = 1;

   pageEvent: PageEvent;
 /*  openDialog = () =>{
    const dialogRef = this.dialog.open(Dialog, {
      width: '250px'
    });
   }*/
  displayedColumns: string[] = ['name', 'place', 'phone', 'actions'];
   onDelete = (user) => {
    this.usersList.splice(this.usersList.indexOf(user), 1);
    this.userService.deleteUser(user.name);
   }
  ngOnInit() {
   this.isLoading = true;


    this.getUsers();
  }
 /* onNoClick(): void {
    this.dialogRef.close();
  }*/
  moveToFav = (user) => {
    this.userService.addFav(user);
  }


  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.pageSize = pageData.pageSize;
    this.getUsers();
  }

  private getUsers = () => {

    // for (let item of this.userService.getUsersList() ) {
    //   this.usersList.push(
    //     {
    //       ...item,
    //       rowClass: 'localUser'
    //     });
    // }
    this.usersList = [];

    const queryParams = '?per_page='+this.pageSize+'&since='+((this.currentPage-1)*this.pageSize+1);
    this.http.get('https://api.github.com/users'+queryParams)
   .subscribe((httpData: Array<any>) => {
     this.isLoading = false;
     for (let item of httpData) {
       this.usersList.push(
         {
           name: item.login,
           place: item.login,
           phone: item.id + '',
           rowClass: 'webUser'
         }
       );
     }
   }
   );
  }

  ngOnDestroy(): void {
  }
}
