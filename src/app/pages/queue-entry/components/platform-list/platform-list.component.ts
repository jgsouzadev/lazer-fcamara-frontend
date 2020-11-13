import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Platforms, PlatformQueue } from '../queue-in/queue-in.component'

@Component({
  selector: 'app-platform-list',
  templateUrl: './platform-list.component.html',
  styleUrls: ['./platform-list.component.scss']
})
export class PlatformListComponent implements OnInit {

  @Input() platforms: Platforms[]
  @Input() platformQueue: PlatformQueue[]

  @Output() selectedPlatformEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSelectChangeEvent(e) {
    this.selectedPlatformEvent.emit(e.option._value)
  }
}
