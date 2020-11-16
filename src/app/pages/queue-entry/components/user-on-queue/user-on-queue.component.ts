import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-on-queue',
  templateUrl: './user-on-queue.component.html',
  styleUrls: ['./user-on-queue.component.scss']
})
export class UserOnQueueComponent implements OnInit {

  @Input() userPosition: number

  constructor() { }

  ngOnInit(): void {
  }


}
