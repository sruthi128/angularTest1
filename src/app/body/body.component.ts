import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'body-root',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent{
  @Input() isLoggedin: boolean;
  dataEnterred: String
  userMasterArray = [
    {
      name: 'Vijay',
      place:
      {
        name: 'Hyderabad',
        population: 3404
      }
    },
    {
      name: 'Sruthi',
      place:
      {
        name: 'Vijayawada',
        population: 2345
      }
    }
    ];
  userArray = this.userMasterArray.map((item) => {
    const resp = {
      name: item.name,
      place: item.place.name +" (" +item.place.population+")"
    };
    return resp;
  });
  onSubmit = (name:String,place:String,phone:String) =>{
    console.log(name)
    this.dataEnterred =" your name: "+name+ "\n your place: " +place+ "\n your phone number: " +phone
  }
  onClear = () =>{
    this.dataEnterred =null
  }
}


