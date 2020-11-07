import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

interface IUser {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  preserveWhitespaces: false
})

export class SignUpComponent implements OnInit {
  userForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.formBuilder();
  }

  formBuilder() {
    this.userForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    })
  }

  enviar() {
    console.log('user', this.userForm);
  }

}
