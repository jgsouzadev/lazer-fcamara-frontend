import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return await this.verifyAccess();
  }

  async canLoad(route: Route) {
    const userToken = await this.authService.getLocalUser();

    if (userToken) {
      this.router.navigate(['/queue-entry'])
      return false
    }

    return true
  }

  async verifyAccess() {
    const userToken = await this.authService.getLocalUser();

    if (userToken) {
      return true;
    }

    this.router.navigate(['/home-authentication']);
    return false;
  }

}
