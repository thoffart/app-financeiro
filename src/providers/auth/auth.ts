import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/catch";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export interface usuariodata {
  nome: string;
  email: string;
  nascimento: string;
  ccredito: boolean;
  cdebito: boolean;
  boleto: boolean;
  password: string;
  created_at: string;
  update_at: string;
}
@Injectable()
export class AuthProvider {
  userdata: any;
  url = "http://127.0.0.1:8000/api/usuarios";
  url1 = "http://127.0.0.1:8000/api/authuser";
  constructor(public http: HttpClient) {
    console.log("Hello AuthProvider Provider");
  }

  postUser(usuario: any): Observable<any> {
    return this.http.post(this.url, usuario);
  }

  authUser(usuario: any): Observable<any> {
    return this.http.post(this.url1, usuario);
  }

  getauthUser(): Observable<any> {
    return this.http.get(this.url1);
  }

  saveUserData(data: any) {
    this.userdata = data;
    console.log(this.userdata);
  }

  sendUserData(): any {
    return this.userdata;
  }
}
