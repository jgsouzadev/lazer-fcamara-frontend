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
}

