import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-on-queue',
  templateUrl: './user-on-queue.component.html',
  styleUrls: ['./user-on-queue.component.scss']
})
export class UserOnQueueComponent implements OnInit {

  @Input() userPosition: number

  @Output() onUserQuitQueue = new EventEmitter()
  @Output() onUserChecking  = new EventEmitter()
  @Output() onUserOnGame = new EventEmitter()

  userQuit = false;

  constructor() { }

  ngOnInit(): void {
  }


}
