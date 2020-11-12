import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QueueEntryComponent } from './queue-entry.component';

const routes: Routes = [{ path: '', component: QueueEntryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueueEntryRoutingModule { }
