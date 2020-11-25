import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-quit',
  templateUrl: './confirm-quit.component.html',
  styleUrls: ['./confirm-quit.component.scss']
})
export class ConfirmQuitComponent implements OnInit {

  @Input() userPosition: number

  @Output() onUserQuit = new EventEmitter()
  @Output() onUserCancel = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

}
