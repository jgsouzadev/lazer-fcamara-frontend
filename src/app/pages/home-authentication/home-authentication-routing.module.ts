import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeAuthenticationComponent } from './home-authentication.component';
import { SignUpComponent } from './components/sign-up/sign-up.component'
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component'

const routes: Routes = [
  { path: '', component: HomeAuthenticationComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'recover-password', component: PasswordRecoveryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeAuthenticationRoutingModule { }
