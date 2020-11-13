import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpService } from '../../http.service'

export interface Platforms {
  id: number;
  value: String; // in the angular doc example, it has a value and a viewValue, it seems like the value should be like an id
}

export interface PlatformQueue {
  id: number;
  queueCount: number;
}

@Component({
  selector: 'app-queue-in',
  templateUrl: './queue-in.component.html',
  styleUrls: ['./queue-in.component.scss']
})
export class QueueInComponent implements OnInit {

  platforms: Platforms[] /*= [
    { id: 1, value: "PS4" },
    { id: 2, value: "Monopoly"  },
    { id: 3, value: "Sinuca/PingPong"}
  ];*/

  platformQueue: PlatformQueue[]
  
  selectedPlatform: Platforms

  // Disables the button after being clicked
  buttonFilter: boolean = false

  /* Testing two-way binding example
  @Input()  size: number;
  @Output() sizeChange = new EventEmitter<number>();
  */

  @Output() userPositionEvent = new EventEmitter<any>();
  
  constructor(
    private httpService: HttpService
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

  // can be made in 2 ways, with the selectedPlatform, or calling the function with the platform as parameter
  // queueNumber(platformForm.value.platform.id), discuss which one is better
  queueNumber() { 
    return this.platformQueue.find(platform => platform.id === this.selectedPlatform.id).queueCount
  }

  enviar() {
    //e.preventDefault()
    console.log(this.selectedPlatform);
    this.httpService.enterQueue(this.selectedPlatform).subscribe(data => {
      console.log(data.userInfo);
      const userInfo = {
        position: data.userInfo.position,
        platform: this.selectedPlatform
      }
      this.userPositionEvent.emit(userInfo)
      this.buttonFilter = true
    })
  }

}
