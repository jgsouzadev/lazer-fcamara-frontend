import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  newPasswordForm: FormGroup;
  emailSent: boolean = false;

  queryControl: String

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private httpClient: HttpClient,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.queryControl = this.route.snapshot.paramMap.get('control')
    this.formBuilderUser();
  }

  formBuilderUser() {
    this.newPasswordForm = this.formBuilder.group({
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required]],
    }, { validator: this.checkPassword('password', 'confirmPassword') })
  }

  newPassword() {
    if (this.newPasswordForm.valid) {
      this.httpClient.post<any>(
        `${environment.apiUrl}/new-password`, 
        { 
          password: this.newPasswordForm.value.password,
          control: this.queryControl
        },
      ).subscribe((data) => 
      {
        this.authService.saveUser(data.token)
        this.router.navigateByUrl('queue-entry')
      }, (error) => {
        //this.openSnackBar('Troca de senha inválida', 'Fechar')
        this.openSnackBar('Feature futura!', 'Fechar')
  
        setTimeout(() => {
          this.router.navigateByUrl('home-authentication')
        }, 3000)
        console.error(error)
      })
    }
    else {
      this.openSnackBar('Preencha os campos obrigatórios', 'Fechar')
    }
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