import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
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
  platformForm: FormGroup

  platforms: Platforms[] /*= [
    { id: 1, value: "PS4" },
    { id: 2, value: "Monopoly"  },
    { id: 3, value: "Sinuca/PingPong"}
  ];*/

  platformQueue: PlatformQueue[]
  
  selectedPlatform: Platforms

  selectFilter: boolean = true  
  buttonFilter: boolean = false

  /* Testing two-way binding example
  @Input()  size: number;
  @Output() sizeChange = new EventEmitter<number>();
  */

  @Output() userPositionEvent = new EventEmitter<number>();
  
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.formBuilderUser()

    this.httpService.getPlatforms().subscribe(data => {
      console.log(data);
      
      this.platformQueue = [ ...data.queue ]
      this.platforms = [ ...data.options ]
      this.selectFilter = false
      /*console.log(this.platformQueue);
      console.log(this.platforms);*/
    })
    /* Testing two-way binding example
    setInterval(() => {
      this.size = this.size + 1
      this.sizeChange.emit(this.size)
    }, 1000)
    */
  }

  formBuilderUser() {
    this.platformForm = this.formBuilder.group({
      platform: [null, Validators.required]
    })
  }

  // can be made in 2 ways, with the selectedPlatform, or calling the function with the platform as parameter
  // queueNumber(platformForm.value.platform.id), discuss which one is better
  queueNumber() { 
    //console.log('oi'); 
    //console.log(this.platformQueue.find(platform => platform.id === platformId).queueCount) // Why logging a lot of times
    return this.platformQueue.find(platform => platform.id === this.selectedPlatform.id).queueCount
  }

  enviar() {
    //e.preventDefault()
    console.log(this.platformForm);
    this.httpService.enterQueue(this.platformForm.value.platform).subscribe(data => {
      console.log(data.userInfo);
      this.userPositionEvent.emit(data.userInfo.position)
      this.buttonFilter = true
    })
  }

}
