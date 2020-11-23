import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  async authHeaders() {
    //will be used
    const userToken = this.getLocalUser();



    return new HttpHeaders({
      Authorization2: 'Bearer ' + userToken,
    });
  }

  getLocalUser() {
    let token = localStorage.getItem("userToken");

    let userToken = token == 'false' ? false : token;

    return userToken || true;
  }

  async authentication(dataUserAuthentication) {
    try {
      const userToken: any = await this.http
      .post(`${environment.apiUrl}/auth`, {
        email: dataUserAuthentication.email,
        password: dataUserAuthentication.password,
      })
      .toPromise()

    this.saveUser(userToken.token);

    return userToken.token;
    } catch (error) {
      if (environment.modeDebug) {
        console.log('error', error);
      }
      return null
    }
  }

  async createUser(userCreate) {
    try {
      userCreate.filial = 1;
      const user: any = await this.http
        .post(`${environment.apiUrl}/users`, userCreate)
        .toPromise()

    this.saveUser(user.token);

    return user.token;
    } catch (error) {
      if (environment.modeDebug) {
        console.log('error', error);
      }
      return null
    }
  }

  saveUser(userToken) {
    localStorage.setItem('userToken', userToken);
  }

  logOut() {
    localStorage.removeItem('userToken');
    this.router.navigateByUrl('home-authentication')
  }

}
