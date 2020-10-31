import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeAuthenticationRoutingModule } from './home-authentication-routing.module';
import { HomeAuthenticationComponent } from './home-authentication.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { MaterialModule } from "../../shared/material/material.module";
import { ComponentsModule } from "../../shared/components/components.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [HomeAuthenticationComponent, SignUpComponent, LogInComponent],
  imports: [
    CommonModule,
    HomeAuthenticationRoutingModule,
    MaterialModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeAuthenticationModule { }
