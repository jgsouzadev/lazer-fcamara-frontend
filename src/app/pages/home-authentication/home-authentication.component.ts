import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-authentication',
  templateUrl: './home-authentication.component.html',
  styleUrls: ['./home-authentication.component.scss']
})
export class HomeAuthenticationComponent implements OnInit {

  backgroundColor: string =  'accent';

  constructor() { }

  ngOnInit(): void {
  }

}
