import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeAuthenticationRoutingModule } from './home-authentication-routing.module';
import { HomeAuthenticationComponent } from './home-authentication.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { MaterialModule } from "../../shared/material/material.module";
import { ComponentsModule } from "../../shared/components/components.module";
import { ReactiveFormsModule } from "@angular/forms";
import { DesktopContentComponent } from './shared/components/desktop-content/desktop-content.component';
import { GraphismsComponent } from './shared/components/graphisms/graphisms.component';


@NgModule({
  declarations: [HomeAuthenticationComponent, SignUpComponent, LogInComponent, DesktopContentComponent, GraphismsComponent],
  imports: [
    CommonModule,
    HomeAuthenticationRoutingModule,
    MaterialModule,
    ComponentsModule,
    ReactiveFormsModule
  ]
})
export class HomeAuthenticationModule { }
