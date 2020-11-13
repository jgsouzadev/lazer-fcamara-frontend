import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-platform-list',
  templateUrl: './platform-list.component.html',
  styleUrls: ['./platform-list.component.scss']
})
export class PlatformListComponent implements OnInit {

  @Input() platforms: any

  @Output() selectedPlatformEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSelectChangeEvent(e) {
    this.selectedPlatformEvent.emit(e.option._value)
  }
}
