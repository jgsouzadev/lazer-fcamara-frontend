import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Platforms } from '../../queue-entry.component'

@Component({
  selector: 'app-user-checked',
  templateUrl: './user-checked.component.html',
  styleUrls: ['./user-checked.component.scss']
})
export class UserCheckedComponent implements OnInit {

  @Input() selectedPlatform: Platforms
  @Input() userPosition: number

  @Output() onUserQuitQueue = new EventEmitter()
  @Output() onUserChecking = new EventEmitter()

  userQuit: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}