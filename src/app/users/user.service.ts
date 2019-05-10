import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: "root" })
export class UserService {
  private favouriteListener = new Subject<any>();
  favListObservable = this.favouriteListener.asObservable();

  private favList = [];

  addFav = (favItem) => {
    this.favList.push(favItem);
    this.favouriteListener.next(this.favList);
  }

  // favListChange = (favList) =>{
  //   this.favouriteListener.next(favList)
  // }
}
