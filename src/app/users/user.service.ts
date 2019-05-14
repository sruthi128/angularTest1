import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './user.model';
import { element } from '@angular/core/src/render3';

@Injectable({ providedIn: "root" })
export class UserService {
  private favouriteListener = new Subject<any>();
  favListObservable = this.favouriteListener.asObservable();

  private usersList: User[] = [];
  private favList = [];

  getUsersList = () => {
    return this.usersList;
  }
  addFav = (favItem) => {
    this.favList.push(favItem);
    this.favouriteListener.next(this.favList);
  }
  addUser = (argName: string, argPlace: string, argPhone: string) =>{
    this.usersList.push(
      {
      name : argName,
      place : argPlace,
      phone : argPhone
  });
    //this.favouriteListener.next(this.usersList);
  }

  deleteUser = (argUserName: string) =>{
    console.log('GVK', argUserName);
    console.log('GVK', this.usersList);
    const elementIndex = this.usersList.findIndex((item) => {
      return argUserName === item.name;
    });
    if(elementIndex !== -1){
      this.usersList.splice(elementIndex, 1);
    }
  }
}
