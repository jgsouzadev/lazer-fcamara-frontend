import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formBuilderUser();
  }

  formBuilderUser() {
    this.userForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    })
  }

  enviar() {
    console.log('user', this.userForm);
  }
}
