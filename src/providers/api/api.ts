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
  urlbase = "http://127.0.0.1:8000/api/";
  urlgastos = this.urlbase + "gastos/"
  urlreceitas = this.urlbase + "receitas/";

  urlcat = "http://127.0.0.1:8000/api/categorias/";
  urlList = "http://127.0.0.1:8000/api/listas/";
  urlgasto = "http://127.0.0.1:8000/api/gasto/";
  urlreceita = "http://127.0.0.1:8000/api/receita/";
  
  constructor(public http: HttpClient) {
    console.log("Hello ApiProvider Provider");
  }

  updateReceita(data: any){
    return this.http.put(this.urlreceitas, data).map(res => {
      return JSON.stringify(res);
    });
  }

  updateGasto(data: any){
    return this.http.put(this.urlgastos, data).map(res => {
      return JSON.stringify(res);
    });
  }

  getCat(query: string): Observable<any> {
    return this.http.get(this.urlcat + query).map(res => {
      return JSON.stringify(res);
    });
  }

  getListas(query: string): Observable<any> {
    return this.http.get(this.urlList + query).map(res => {
      return JSON.stringify(res);
    });
  }

  postListas(data: any): Observable<any> {
    return this.http.post(this.urlList, data).map(res => {
            return JSON.stringify(res);
    });
  }

  getGastos(query: string): Observable<any> {
    return this.http.get(this.urlgastos + query).map(res => {
      return JSON.stringify(res);
    });
  }
  
  getReceitas(query: string): Observable<any> {
    return this.http.get(this.urlreceitas + query).map(res => {
      return JSON.stringify(res);
    });
  }

  deleteListas(data: any): Observable<any> {
    return this.http.delete(this.urlList + data).map(res => {
          return JSON.stringify(res);
    });
  }


  deleteGasto(id: string): Observable<any> {
    return this.http.delete(this.urlgastos + id).map(res => {
      return JSON.stringify(res);
    });
  }
  
  postGasto(data: any): Observable<any> {
    return this.http.post(this.urlgasto, data);
  }

  postReceita(data: any): Observable<any> {
    return this.http.post(this.urlreceita, data);
  }

  deleteReceita(id: any): Observable<any> {
    return this.http.delete(this.urlreceitas + id);
  }
}
