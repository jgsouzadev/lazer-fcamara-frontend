import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'queue-entry', pathMatch: 'full' },
  {
    path: 'home-authentication',
    loadChildren: () =>
      import('./pages/home-authentication/home-authentication.module').then(
        (m) => m.HomeAuthenticationModule
      ),
  },
  { path: 'queue-entry', loadChildren: () => import('./pages/queue-entry/queue-entry.module').then(m => m.QueueEntryModule) },
  { path: '**', redirectTo: 'home-authentication'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
