import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueueEntryRoutingModule } from './queue-entry-routing.module';
import { QueueEntryComponent } from './queue-entry.component';
import { MaterialModule } from "../../shared/material/material.module";
import { ComponentsModule } from "../../shared/components/components.module";
import { ReactiveFormsModule } from "@angular/forms";
import { QueueInComponent } from './components/queue-in/queue-in.component';
import { UserOnQueueComponent } from './components/user-on-queue/user-on-queue.component';

import { HttpClientModule } from '@angular/common/http';
import { PlatformListComponent } from './components/platform-list/platform-list.component'


@NgModule({
  declarations: [QueueEntryComponent, QueueInComponent, UserOnQueueComponent, PlatformListComponent],
  imports: [
    CommonModule,
    QueueEntryRoutingModule,
    MaterialModule,   // Discuss if it's actually needed
    ComponentsModule,
    HttpClientModule  // Doing nothing rn because it's already in app.module
  ]
})
export class QueueEntryModule { }
