import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueueEntryRoutingModule } from './queue-entry-routing.module';
import { QueueEntryComponent } from './queue-entry.component';
import { MaterialModule } from "../../shared/material/material.module";
import { ComponentsModule } from "../../shared/components/components.module";
import { ReactiveFormsModule } from "@angular/forms";
import { QueueInComponent } from './components/queue-in/queue-in.component';
import { MatSelectModule } from '@angular/material/select';
import { UserOnQueueComponent } from './components/user-on-queue.component';


@NgModule({
  declarations: [QueueEntryComponent, QueueInComponent, UserOnQueueComponent],
  imports: [
    CommonModule,
    QueueEntryRoutingModule,
    MaterialModule,
    ComponentsModule,
    ReactiveFormsModule,
    MatSelectModule
  ]
})
export class QueueEntryModule { }
