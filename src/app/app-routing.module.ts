import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  { path: '', redirectTo: 'home-authentication', pathMatch: 'full' },
  {
    path: 'home-authentication',
    loadChildren: () =>
      import('./pages/home-authentication/home-authentication.module').then(
        (m) => m.HomeAuthenticationModule
      ), canLoad: [AuthGuard]
  },
  { path: 'queue-entry', loadChildren: () => import('./pages/queue-entry/queue-entry.module').then(m => m.QueueEntryModule), canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home-authentication'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
