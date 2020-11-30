import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AuthService } from "../../../../auth.service";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  preserveWhitespaces: false
})

export class SignUpComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formBuilderUser();
  }

  formBuilderUser() {
    this.userForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required]],
    }, { validator: this.checkPassword('password', 'confirmPassword') })
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

  async createAccount() {
    if (this.userForm.valid) {
      const { name, email, password } = this.userForm.value

      let userAuthenticate = await this.authService.createUser({ name, email, password });

      if (userAuthenticate.error) {
        this.openSnackBar(userAuthenticate.error.msg, 'Fechar');
        this.userForm.controls['email'].setErrors({'incorrect': true})
        return
      }

      this.userForm.controls['email'].setErrors(null)
      await this.router.navigateByUrl('queue-entry')
    }
    else {
      this.openSnackBar('Preencha os campos obrigatórios', 'Fechar')
    }
  }

  openSnackBar(message: string = 'Lamento, mas não foi possível criar seu usuário', action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
