import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Platforms } from '../../queue-entry.component'

@Component({
  selector: 'app-user-on-game',
  templateUrl: './user-on-game.component.html',
  styleUrls: ['./user-on-game.component.scss']
})
export class UserOnGameComponent implements OnInit {

  @Input() selectedPlatform: Platforms

  @Output() onClickEvent = new EventEmitter<any>();

  userQuit: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
