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

  authHeaders() {
    const userToken = this.getLocalUser();

    return new HttpHeaders({
      'x-access-token': userToken,
      'Content-Type': 'application/json',
    });
  }

  getLocalUser() {
    const userToken: string = localStorage.getItem("userToken");

    return userToken;
  }

  authUser() {
    return this.http.get<any>(
      `${environment.apiUrl}/auth/`,
      { headers: this.authHeaders() }
    )
  }

  async userLogIn(dataUserAuthentication) {
    try {
      const userToken: any = await this.http
      .post(`${environment.apiUrl}/auth`, {
        email: dataUserAuthentication.email,
        password: dataUserAuthentication.password,
      })
      .toPromise()

    this.saveUser(userToken.token);

    return userToken;
    
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
      console.log(userCreate);
      
      const user: any = await this.http
        .post(`${environment.apiUrl}/users`, userCreate)
        .toPromise()

    this.saveUser(user.token);

    return user.token;
    } catch (error) {
      if (environment.modeDebug) {
        console.log('error', error);
      }
      return error
    }
  }

  saveUser(userToken) {
    localStorage.setItem('userToken', userToken);
  }

  logOut() {
    localStorage.removeItem('userToken');
    this.router.navigateByUrl('')
  }

}
