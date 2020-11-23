import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Platforms } from '../../queue-entry.component'

@Component({
  selector: 'app-user-on-queue',
  templateUrl: './user-on-queue.component.html',
  styleUrls: ['./user-on-queue.component.scss']
})
export class UserOnQueueComponent implements OnInit {

  @Input() userPosition: number

  //@Input() selectedPlatform: Platforms

  @Output() onUserQuitQueue = new EventEmitter()
  @Output() onUserChecking  = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }


}
