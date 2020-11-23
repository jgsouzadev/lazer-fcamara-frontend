import { Component, OnInit, OnDestroy } from '@angular/core';
import { QueueEntryHttpService } from './services/queue-entry-http.service';

import { MatSnackBar } from '@angular/material/snack-bar'

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
export class QueueEntryComponent implements OnInit, OnDestroy {

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
    private httpService: QueueEntryHttpService,
    private _snackBar: MatSnackBar
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
    },
    (error) => {
      console.error(error)
      this.handleRequestError()
    })
  }

  ngOnDestroy(): void {
    this.userPosition = 0;
    this.buttonFilter = false
    clearInterval(this.refIntervalUserPosition)
    clearInterval(this.refIntervalUserPosition)
  }

  handlePlatformChange() {
    this.buttonFilter = false;
  }

  handleUserEnterQueue() {
    if (this.userChecked) {
      this.userChecked = false
    }
    else {
      this.httpService.enterQueue(this.selectedPlatform).subscribe(data => {
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
      }, 
      (error) => {
        console.error(error)
        this.handleRequestError()
      })
    }
  }

  handleUserQuitQueue() {
    if (this.userPosition == 1) {
      this.httpService.quitGame(this.userId).subscribe(() => { 
        this.userPosition = 0;
        this.buttonFilter = true
        this.userChecked = false
        this.userId = 0
        clearInterval(this.refIntervalUserPosition)
        clearInterval(this.refIntervalUserPosition)
      },
      (error) => {
        console.error(error)
        this.handleRequestError()
      })
    }
    else {
      this.httpService.quitQueue(this.userId).subscribe(() => { 
        this.userPosition = 0
        this.buttonFilter = true
        this.userChecked = false
        this.userId = 0
        clearInterval(this.refIntervalUserPosition)
        clearInterval(this.refIntervalUserPosition)
      }, 
      (error) => {
        console.error(error)
        this.handleRequestError()
      })
    }
  }

  handleRequestError() {
    this._snackBar.open('Não foi possível completar a requisição, recarregue a página', 'Fechar', {
      duration: 4000,
    });
  }
}
