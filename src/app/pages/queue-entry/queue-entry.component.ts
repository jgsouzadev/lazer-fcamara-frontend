import { Component, OnInit } from '@angular/core';
import { Platforms } from './components/queue-in/queue-in.component'

@Component({
  selector: 'app-queue-entry',
  templateUrl: './queue-entry.component.html',
  styleUrls: ['./queue-entry.component.scss']
})
export class QueueEntryComponent implements OnInit {

  userPosition: number = 0

  selectedPlatform: Platforms

  constructor() { }

  ngOnInit(): void {
  }

  /* Doesnt need this implementation, can be done in html itself
  receiveUserPosition($event) {
    this.userPosition = $event
  }
  */
}
