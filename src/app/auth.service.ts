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
    const userToken: any = await this.http
      .post(`${environment.apiUrl}/auth`, {
        email: dataUserAuthentication.email,
        password: dataUserAuthentication.password,
      })
      .toPromise()
      .then(
        async token => {
          this.saveUser(token);

          await this.router.navigateByUrl('queue-entry');
        },
        error => {
          return false
        }
      );

    return userToken;
  }

  async createUser(userCreate) {
    const user: any = await this.http
      .post(`${environment.apiUrl}/auth`, userCreate)
      .toPromise()
      .then(
        async token => {
          this.saveUser(token);

          await this.router.navigateByUrl('queue-entry')
        },
        error => {
          return false
        }
      );

    return user;
  }

  saveUser(userToken) {
    localStorage.setItem('userToken', userToken);
  }

  logOut() {
    localStorage.removeItem('userToken');
  }

}
