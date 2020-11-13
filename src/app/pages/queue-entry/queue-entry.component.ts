import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-queue-entry',
  templateUrl: './queue-entry.component.html',
  styleUrls: ['./queue-entry.component.scss']
})
export class QueueEntryComponent implements OnInit {

  userPosition: number = 0

  constructor() { }

  ngOnInit(): void {
  }

  /* Doesnt need this implementation, can be done in html itself
  receiveUserPosition($event) {
    this.userPosition = $event
  }
  */
}
