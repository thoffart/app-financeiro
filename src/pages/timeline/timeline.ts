import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from "./../../providers/api/api";
import { AuthProvider } from "../../providers/auth/auth";

/**
 * Generated class for the TimelinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
})
export class TimelinePage {
  gastos: any = [];
  categorias: any = [];
  userdata: any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private api: ApiProvider,
     private auth: AuthProvider
    ) {
      this.userdata = this.auth.sendUserData();
  }

  delete(gasto: any){
    this.api.deleteGasto(gasto.id).subscribe(res => { //Remove do BD
      var index = this.gastos.indexOf(gasto); //Pega indice no front
      if (index > -1) {
        this.gastos.splice(index, 1); //Remove do front
      }
    });
  }

  ionViewWillEnter(){
    this.api.getGastos(this.userdata.email).subscribe(res => { //Pega os gastos e atualiza o grafico
      this.gastos = JSON.parse(res).gastos;
      console.log(this.gastos);
    });
  }
}
