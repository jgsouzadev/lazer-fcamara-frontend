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
    let token = localStorage.getItem("userToken");

    let userToken = token == 'false' ? false : token;

    return userToken || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTYwNjU5MDIxMSwiZXhwIjoxNjA2NjAwMjExfQ.fHQb85ioiO91ecHcAF-fqnoS15CM11uAFQLPqRFnFfE';
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

    // FAZER A VERIFICAÇÃO SE O USUÁRIO ESTÁ NA FILA AQUI COM O "userToken"

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
      return null // ACHO QUE SE MANDAR O ERROR AQUI, EU CONSIGO PEGAR A MENSAGEM DE ERROR, VERIFICAR
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
