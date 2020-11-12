import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

interface Platforms {
  value: String; // in the angular doc example, it has a value and a viewValue, it seems like the value should be like an id
  queueCount: number;
}

@Component({
  selector: 'app-queue-in',
  templateUrl: './queue-in.component.html',
  styleUrls: ['./queue-in.component.scss']
})
export class QueueInComponent implements OnInit {
  platformForm: FormGroup

  platforms: Platforms[] = [
    { value: "PS4", queueCount: 0 },
    { value: "Xbox", queueCount: 2 },
    { value: "Mesa de Sinuca/PingPong", queueCount: 10}
  ];
  
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formBuilderUser()
  }

  formBuilderUser() {
    this.platformForm = this.formBuilder.group({
      platform: [null, Validators.required]
    })
  }

  queueNumber(platformValue) {
    //console.log(this.platforms.find(platform => platform.value === platformValue)) Why logging a lot of times
    return this.platforms.find(platform => platform.value === platformValue).queueCount
  }

  enviar() {
    //e.preventDefault()
    console.log(this.platformForm);
  }

}
