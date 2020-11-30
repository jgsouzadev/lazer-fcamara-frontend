import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {

  recoverForm: FormGroup;
  emailSent: boolean = false;
  timer: number = 5
  
  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.formBuilderUser();
  }

  formBuilderUser() {
    this.recoverForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    })
  }

  recoverPassword() {
    if (this.recoverForm.valid) {
      this.httpClient.post(
        `${environment.apiUrl}/recover-password`, 
        { email: this.recoverForm.value.email },
      ).subscribe(() => 
      {
        this.emailSent = true
        this.recoverForm.controls['email'].setErrors(null)
        const refTimerInterval = setInterval(() => {
          this.timer--
        }, 1000)
  
        setTimeout(() => {
          this.router.navigateByUrl('home-authentication')
          clearInterval(refTimerInterval)
        }, 5000)
      }, (error) => {
        //this.openSnackBar('Email inexistente', 'Fechar')
        this.openSnackBar('Feature futura!', 'Fechar')
        this.recoverForm.controls['email'].setErrors({'incorrect': true})
        console.error(error)
      })
    }
    else {
      this.openSnackBar('Preencha os campos obrigatórios', 'Fechar')
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
}   