import { Component, OnInit, OnDestroy } from '@angular/core';
import { QueueEntryHttpService } from './services/queue-entry-http.service';

import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth.service';

export interface Platforms {
  id: number;
  name: String; // in the angular doc example, it has a value and a viewValue, it seems like the value should be like an id
}

export interface PlatformQueue {
  id_platform: number;
  size: number;
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
  
  userPosition: number = 0

  refIntervalUserPosition: number
  refIntervalPlatformQueue: number

  userChecked: boolean = false
  userOnGame: boolean = false

  userNotification: boolean = true

  constructor(
    private httpService: QueueEntryHttpService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const queryParams = { 
      id: this.route.snapshot.paramMap.get('id'),
      position: this.route.snapshot.paramMap.get('position'),
      notification: this.route.snapshot.paramMap.get('notif'),
      logged: this.route.snapshot.paramMap.get('logged')
    }

    this.httpService.getPlatforms().subscribe(data => {
      this.platforms = [ ...data ]
      
      if (queryParams.logged) {
        if (queryParams.id) {
          const id_platform = parseInt(queryParams.id)
          this.userPosition = parseInt(queryParams.position)
          this.userNotification = queryParams.notification == 'true' ? true : false

          this.selectedPlatform = this.platforms.find(platform => {
            return platform.id === id_platform
          })
          this.activatePolling()
        }
        this.router.navigateByUrl('queue-entry')
      }
      else {
        console.log('fiz a coisa');
        
        this.authService.authUser().subscribe((data) => {
          if (data.id_platform) { // If the user is already in queue
            this.selectedPlatform = this.platforms.find(platform => {
              return platform.id === data.id_platform
            })     
            
            this.userPosition = data.position
            this.userNotification = data.allowNotification
            this.activatePolling()
          }
          console.log('aloo');
          
          console.log('oi', data);
        }, (error) => {
          console.error(error)
          this.handleRequestError(error.error.message)
          this.authService.logOut()
        })
      }
    }, (error) => {
      console.error(error)
      this.handleRequestError()
    })

    this.httpService.getPlatformQueue().subscribe(data => {
      this.platformQueue = [ ...data ]
      console.log(this.platformQueue);
      
      this.refIntervalPlatformQueue = setInterval(() => {
        if (this.userPosition !== 1) {
          this.httpService.getPlatformQueue().subscribe(data => {
            this.platformQueue = [ ...data ]
          }, (error) => {
            console.error(error)
            this.handleRequestError()
          })
        }
      }, 300000) // 5 minutes
    }, (error) => {
      console.error(error)
      this.handleRequestError()
    })
  }

  ngOnDestroy(): void {
    this.removeUser()
    clearInterval(this.refIntervalPlatformQueue)
  }

  handleUserEnterQueue() {
    this.httpService.enterQueue(this.selectedPlatform).subscribe(data => {
      this.userPosition = data.position
      this.userNotification = data.notification

      this.activatePolling()
    }, (error) => {
      console.error(error)
      this.handleRequestError()
    })
  }

  activatePolling() {
    this.refIntervalUserPosition = setInterval(() => {
      if (this.userPosition && this.userPosition !== 1) {
        this.httpService.getUserPosition(this.selectedPlatform).subscribe(data => {
          if (this.userPosition) {
            this.userPosition = data.position
            if (this.userPosition === 1) {
              this.userChecked = false
            }
          }
        }, (error) => {
          console.error(error)
          this.handleRequestError()
        })
      }
    }, 25000)// 60000 = 1 minute
  }

  handleUserQuitQueue() {
    this.httpService.quitQueue(this.selectedPlatform).subscribe(() => { 
      this.removeUser()

      this.httpService.getPlatformQueue().subscribe(data => {
        this.platformQueue = data
      })
      
      this.router.navigateByUrl('queue-entry')
    }, (error) => {
      console.error(error)
      this.handleRequestError()
    })
  }

  handleUserNotification() {
    this.httpService.disableNotifications().subscribe(() => {
      console.log("Notificação desativada com sucesso!");
    }, (error) => {
      console.error(error)
      this.handleRequestError()
    })
  }

  removeUser() {
    this.userPosition = 0;
    this.userChecked = false
    this.userOnGame = false
    clearInterval(this.refIntervalUserPosition)
  }

  handleRequestError(msg = "Não foi possível completar a requisição, recarregue a página") {
    this._snackBar.open(msg, 'Fechar', {
      duration: 4000,
    });
  }
}
