import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AuthService } from "../../../../auth.service";

import { MatSnackBar } from '@angular/material/snack-bar';
import { UserOnQueueComponent } from 'src/app/pages/queue-entry/components/user-on-queue/user-on-queue.component';


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
    let userToken: any = await this.authService.authentication(this.userForm.value);

    if(!userToken) {
      this.openSnackBar('Verifique sua senha ou seu email', 'Fechar')
      return
    }
    
    if (userToken.position) {
      await this.router.navigate(['queue-entry', { id: userToken.id_platform, position: userToken.position }]);
    } else {
      await this.router.navigate(['queue-entry']);
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
