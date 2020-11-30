import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Platforms, PlatformQueue } from '../../queue-entry.component'

@Component({
  selector: 'app-platform-list',
  templateUrl: './platform-list.component.html',
  styleUrls: ['./platform-list.component.scss']
})
export class PlatformListComponent implements OnInit {

  @Input() platforms: Platforms[]
  @Input() platformQueue: PlatformQueue[]

  @Output() onPlatformChange = new EventEmitter();

  @Output() onClickEvent = new EventEmitter<any>();

  // Disables the button after being clicked
  @Input() userChecked:  boolean = false

  selectedPlatform: Platforms
  errorMessage: boolean = false
  
  constructor(
  ) { }

  ngOnInit(): void {
    //console.log('platforms', this.platforms);
    //console.log('platforms', this.platformQueue);
  }

  onSelectChangeEvent(e) {
    this.selectedPlatform = e.option._value
    this.onPlatformChange.emit(e.option._value)
  }
  
  handleBttnClick() {
    if (this.selectedPlatform) {
      this.onClickEvent.emit()
    }
    else {
      this.errorMessage = true
    }
  }
}
