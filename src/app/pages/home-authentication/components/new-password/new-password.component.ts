import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  newPasswordForm: FormGroup;
  emailSent: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.formBuilderUser();
  }

  formBuilderUser() {
    this.newPasswordForm = this.formBuilder.group({
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required]],
    }, { validator: this.checkPassword('password', 'confirmPassword') })
  }

  newPassword() {
    this.httpClient.post<any>(
      "https://www.fakeapi.online/api/apis/jaimemathias/api/user/password-recovery",
      //`${environment.apiUrl}/`, 
      { password: this.newPasswordForm.value.password },
    ).subscribe((data) => 
    {
      this.authService.saveUser(12321)
      this.router.navigateByUrl('queue-entry')
    }, (error) => {
      this.openSnackBar('Troca de senha inválida', 'Fechar')

      setTimeout(() => {
        this.router.navigateByUrl('home-authentication')
      }, 3000)
      console.error(error)
    })
  }

  checkPassword(password: string, passwordConfirmation: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[password],
      passwordConfirmationInput = group.controls[passwordConfirmation];
      
      if ((passwordInput.value !== passwordConfirmationInput.value) || (passwordConfirmationInput.value === null)) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
      else {
        return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
} 