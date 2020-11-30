import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AuthService } from "../../../../auth.service";

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formBuilderUser();
  }

  formBuilderUser() {
    this.userForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  }

  async authentication() {
    if (this.userForm.valid) { 
      let userToken: any = await this.authService.userLogIn(this.userForm.value);

      if(!userToken) {
        this.openSnackBar('Verifique sua senha ou seu email', 'Fechar')
        return
      }
      
      if (userToken.id_platform) {
        await this.router.navigate(['queue-entry', { id: userToken.id_platform, position: userToken.position, notif: userToken.allowNotification, logged: true }]);
      } else {
        await this.router.navigate(['queue-entry', { logged: true }]);
      }
    }
    else {
      this.openSnackBar('Preencha os campos obrigatórios', 'Fechar')
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
