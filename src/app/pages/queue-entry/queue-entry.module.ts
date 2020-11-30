import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueueEntryRoutingModule } from './queue-entry-routing.module';
import { QueueEntryComponent } from './queue-entry.component';
import { MaterialModule } from "../../shared/material/material.module";
import { ComponentsModule } from "../../shared/components/components.module";
import { UserOnQueueComponent } from './components/user-on-queue/user-on-queue.component';

import { HttpClientModule } from '@angular/common/http';
import { PlatformListComponent } from './components/platform-list/platform-list.component'
import { AuthService } from 'src/app/auth.service';
import { AuthGuard } from 'src/app/auth.guard';
import { GraphismsComponent } from './shared/components/graphisms/graphisms.component';
import { UserOnGameComponent } from './components/user-on-game/user-on-game.component';
import { ConfirmQuitComponent } from './shared/components/confirm-quit/confirm-quit.component';
import { GraphismsOrangeDisplayComponent } from './shared/components/graphisms-orange-display/graphisms-orange-display.component';
import { UserCheckedComponent } from './components/user-checked/user-checked.component';


@NgModule({
  declarations: [QueueEntryComponent, UserOnQueueComponent, PlatformListComponent, GraphismsComponent, UserOnGameComponent, ConfirmQuitComponent, GraphismsOrangeDisplayComponent, UserCheckedComponent],
  imports: [
    CommonModule,
    QueueEntryRoutingModule,
    MaterialModule,   // Discuss if it's actually needed
    ComponentsModule,
    HttpClientModule  // Doing nothing rn because it's already in app.module
  ],
  providers: [AuthService, AuthGuard]
})
export class QueueEntryModule { }
