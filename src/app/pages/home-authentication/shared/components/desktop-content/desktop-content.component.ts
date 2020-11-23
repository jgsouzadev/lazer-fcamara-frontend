import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-desktop-content',
  templateUrl: './desktop-content.component.html',
  styleUrls: ['./desktop-content.component.scss']
})
export class DesktopContentComponent implements OnInit {

  constructor() { }

  @Input() disabled: boolean = false

  ngOnInit(): void {
  }

}
