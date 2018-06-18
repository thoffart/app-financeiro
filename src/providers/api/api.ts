import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  urlcat = "http://127.0.0.1:8000/api/categorias/";
  urlgasto = "http://127.0.0.1:8000/api/gasto/";
  urlreceita = "http://127.0.0.1:8000/api/receita/";
  constructor(public http: HttpClient) {
    console.log("Hello ApiProvider Provider");
  }

  getCat(query: string): Observable<any> {
    return this.http.get(this.urlcat + query).map(res => {
      return JSON.stringify(res);
    });
  }

  postGasto(data: any): Observable<any> {
    return this.http.post(this.urlgasto, data);
  }

  postReceita(data: any): Observable<any> {
    return this.http.post(this.urlreceita, data);
  }
}
