import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  url = "http://127.0.0.1:8000/api/usuarios";
  constructor(public http: HttpClient) {
    console.log("Hello AuthProvider Provider");
  }

  postUser(usuario: any): Observable<any> {
    return this.http.post(this.url, usuario);
  }
}
