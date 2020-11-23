import { Component, OnInit, ViewChild } from '@angular/core';
import { QueueEntryHttpService } from './services/queue-entry-http.service';

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
  
  buttonFilter: boolean = true

  userId: number = 0
  userPosition: number = 0

  refIntervalUserPosition: number
  refIntervalPlatformQueue: Number

  userChecked: boolean = false

  constructor(
    private httpService: QueueEntryHttpService
  ) { }

  ngOnInit(): void {
    this.httpService.getPlatforms().subscribe(data => {
      this.platformQueue = [ ...data.queue ]
      this.platforms = [ ...data.platforms ]

      this.refIntervalPlatformQueue = setInterval(() => {
        this.httpService.getPlatformQueue().subscribe(data => {
          this.platformQueue = [ ...data.queue ] // Discuss if this is more efficient than doing a .map
        })
      }, 300000) // 5 minutes
    })
  }

  handlePlatformChange() {
    this.buttonFilter = false;
  }

  handleUserEnterQueue() {
    this.httpService.enterQueue(this.selectedPlatform).subscribe(data => {
      this.buttonFilter = true
      this.userPosition = data.userInfo.position
      this.userId = data.userInfo.id
      this.refIntervalUserPosition = setInterval(() => {
        if (this.userPosition) {
          this.httpService.getUserPosition(this.userId).subscribe(data => {
            if (this.userPosition) {
              // There was cases that the request was made in the same moment that the interval was cleared
              // so it'd think that the user is still in the queue
              this.userPosition = data.position
            }
          })
        }
      }, 60000)// 1 minute
    })
  }

  handleUserQuitQueue() {
    if (this.userPosition == 1) {
      this.httpService.quitGame(this.userId).subscribe(() => { 
        console.log('Sucesso ao sair do jogo!')
      })
    }
    else {
      this.httpService.quitQueue(this.userId).subscribe(() => { 
        console.log('Sucesso ao sair da fila!')
      })
    }
  }
}
