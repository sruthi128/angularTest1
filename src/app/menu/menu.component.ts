import { Component } from '@angular/core';

@Component({
  selector: 'menu-root',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  textClicked:String = "Click any link"
  link(id: String){
    console.log(id)
    this.textClicked=id
  }
}
