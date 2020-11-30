import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeAuthenticationComponent } from './home-authentication.component';
import { SignUpComponent } from './components/sign-up/sign-up.component'
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component'
import { NewPasswordComponent } from './components/new-password/new-password.component'

const routes: Routes = [
  { path: '', component: HomeAuthenticationComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'recover-password', component: PasswordRecoveryComponent },
  { path: 'new-password', component: NewPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeAuthenticationRoutingModule { }
