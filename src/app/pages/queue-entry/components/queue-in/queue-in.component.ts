import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Platforms } from '../../queue-entry.component';
import { QueueEntryHttpService } from '../../services/queue-entry-http.service'


@Component({
  selector: 'app-queue-in',
  templateUrl: './queue-in.component.html',
  styleUrls: ['./queue-in.component.scss']
})
export class QueueInComponent implements OnInit {


  userQueue = [
    {name: 'Andrew Dias 1', order: 1},
    {name: 'Andrew Dias 2', order: 2},
    {name: 'Andrew Dias 3', order: 3},
    {name: 'Andrew Dias 4', order: 4},
    {name: 'Andrew Dias 5', order: 5},
  ]

  // Disables the button after being clicked
  /* Testing two-way binding example
  @Input()  size: number;
  @Output() sizeChange = new EventEmitter<number>();
  */
 
  @Input() buttonFilter: boolean = false

  @Output() userPositionEvent = new EventEmitter<any>();
  
  @Output() onClickEvent = new EventEmitter<any>();

  @Input() selectedPlatform: Platforms

  constructor(
    private httpService: QueueEntryHttpService
  ) { }

  ngOnInit(): void {

  }

  getImageSrc() {
    switch (this.selectedPlatform.id) {
      case 1:
        return "../../../../../assets/PS4.svg"
      case 2: 
        return "../../../../../assets/Ping-Pong.svg"
      case 3:
      case 4: 
        return "../../../../../assets/snooker.svg"
      default:
        //return "../../../../../assets/PS4.svg"
    }
  }

  // can be made in 2 ways, with the selectedPlatform, or calling the function with the platform as parameter
  // queueNumber(platformForm.value.platform.id), discuss which one is better
  /*queueNumber() {
    return this.platformQueue.find(platform => platform.id === this.selectedPlatform.id).queueCount
  }*/

  enviar() {
    //e.preventDefault()
    //console.log(this.selectedPlatform);
    // this.httpService.enterQueue(this.selectedPlatform).subscribe(data => {
      //console.log(data.userInfo);
      // const userInfo = {
      //   position: data.userInfo.position,
      //   platform: this.selectedPlatform
      // }
      // this.userPositionEvent.emit(userInfo)
      // this.buttonFilter = true
  }
}

