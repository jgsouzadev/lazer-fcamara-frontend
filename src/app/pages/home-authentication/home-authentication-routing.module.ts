import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeAuthenticationComponent } from './home-authentication.component';

const routes: Routes = [{ path: '', component: HomeAuthenticationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeAuthenticationRoutingModule { }
