import { Component } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'header-root',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title = 'Hi';
  colourChange = "white"
  onClick(event)
  {
    this.colourChange= "darkblue"
  }
}
