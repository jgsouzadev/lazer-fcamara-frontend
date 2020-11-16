import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-platform-list',
  templateUrl: './platform-list.component.html',
  styleUrls: ['./platform-list.component.scss']
})
export class PlatformListComponent implements OnInit {

  @Input() platforms: any
  @Input() platformQueue: any

  @Output() selectedPlatformEvent = new EventEmitter();

  constructor(
  ) { }

  ngOnInit(): void {
    console.log('platforms', this.platforms);
    console.log('platforms', this.platformQueue);
    console.log('platforms', this.platforms);
  }

  onSelectChangeEvent(e) {
    this.selectedPlatformEvent.emit(e.option._value)
  }

  next() {
  }
}
