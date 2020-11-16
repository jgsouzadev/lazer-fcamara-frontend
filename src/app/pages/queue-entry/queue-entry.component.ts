import { Component, OnInit, ViewChild } from '@angular/core';
import { QueueEntryHttpService } from './services/queue-entry-http.service';
import { MatStepper } from '@angular/material/stepper';

export interface Platforms {
  id: number;
  value: String; // in the angular doc example, it has a value and a viewValue, it seems like the value should be like an id
}

export interface PlatformQueue {
  id: number;
  queueCount: number;
}


@Component({
  selector: 'app-queue-entry',
  templateUrl: './queue-entry.component.html',
  styleUrls: ['./queue-entry.component.scss']
})
export class QueueEntryComponent implements OnInit {

  platforms: Platforms[] /*= [
    { id: 1, value: "PS4" },
    { id: 2, value: "Monopoly"  },
    { id: 3, value: "Sinuca/PingPong"}
  ];*/

  platformQueue: PlatformQueue[]

  userPosition: number = 0

  selectedPlatform: Platforms

  constructor(
    private httpService: QueueEntryHttpService
  ) { }

  ngOnInit(): void {
    this.httpService.getPlatforms().subscribe(data => {
      console.log(data);

      this.platformQueue = [ ...data.queue ]
      this.platforms = [ ...data.options ]
      //console.log(this.platformQueue);
      //console.log(this.platforms);
    })
    /* Testing two-way binding example
    setInterval(() => {
      this.size = this.size + 1
      this.sizeChange.emit(this.size)
    }, 1000)
    */
  }

  /* Doesnt need this implementation, can be done in html itself
  receiveUserPosition($event) {
    this.userPosition = $event
  }
  */

  @ViewChild('stepper') private myStepper: MatStepper;
  
  handlePlatformChange($event) {
    this.selectedPlatform = $event
    this.myStepper.next()
  }
}
