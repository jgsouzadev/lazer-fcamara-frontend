import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

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

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formBuilderUser();
  }

  formBuilderUser() {
    this.userForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
    })
  }

  enviar() {
    console.log('user', this.userForm);
  }

}
