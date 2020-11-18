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

  platforms: Platforms[]
  platformQueue: PlatformQueue[]
  
  selectedPlatform: Platforms
  
  buttonFilter: boolean = false

  userPosition: number = 0

  constructor(
    private httpService: QueueEntryHttpService
  ) { }

  ngOnInit(): void {
    this.httpService.getPlatforms().subscribe(data => {
      this.platformQueue = [ ...data.queue ]
      this.platforms = [ ...data.platforms ]
    })
    
    setInterval(() => {
      this.httpService.getPlatformQueue().subscribe(data => {
        this.platformQueue = [ ...data.queue ] // Discuss if this is more efficient than doing a .map
      })
    }, 300000) // 5 minutes
  }

  @ViewChild('stepper') private myStepper: MatStepper;
  handlePlatformChange() {
    this.myStepper.next()
  }

  handleUserEnterQueue() {
    this.httpService.enterQueue(this.selectedPlatform).subscribe(data => {
      this.userPosition = data.userInfo.position
      this.buttonFilter = true
      this.myStepper.next()
    })
  }

  handleUserQuitQueue() {
    this.userPosition = 0
    this.buttonFilter = false
    this.myStepper.reset()
  }
}
