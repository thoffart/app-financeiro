import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';
import { ApiProvider } from "./../../providers/api/api";
import { AuthProvider } from "../../providers/auth/auth";
import { EditGastoPage } from '../edit-gasto/edit-gasto';
import { EditReceitaPage } from '../edit-receita/edit-receita';

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
  items: any = [];
  categorias: any = [];
  userdata: any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private api: ApiProvider,
     private auth: AuthProvider,
     private modalctrl: ModalController
    ) {
      this.userdata = this.auth.sendUserData();
  }

  delete(item: any){
    if (item.isGasto){
      this.api.deleteGasto(item.id).subscribe(res => { //Remove do BD
        var index = this.items.indexOf(item); //Pega indice no front
        if (index > -1) {
          this.items.splice(index, 1); //Remove do front
        }
      });
    }
    else {
      this.api.deleteReceita(item.id).subscribe(res => {
        var index = this.items.indexOf(item); //Pega indice no front
        if (index > -1) {
          this.items.splice(index, 1); //Remove do front
        }
      });
    }
  }

  ionViewWillEnter(){
   this.atualizaFeed();
  }

  atualizaFeed(){
    let gastos, receitas;
    let temp: any = [];

    this.api.getGastos(this.userdata.email).subscribe(gasto => { //Pega os gastos e atualiza o grafico
      gastos = JSON.parse(gasto).gastos;

      this.api.getReceitas(this.userdata.email).subscribe(rec => {
        receitas = JSON.parse(rec).receitas;

        let maxlen = receitas.length + gastos.length;
        let g = 0, r = 0;
        for(let i=0; i < maxlen; i++){

          let receita_unix, gasto_unix;

          try {
            gasto_unix = Date.parse(gastos[g].created_at); 
            gastos[g].tipo = gastos[g].categoria.nome; 
            gastos[g].isGasto = true;
          } catch {
            gasto_unix = 0;
          }

          try {
            receita_unix = Date.parse(receitas[r].created_at);
            receitas[r].tipo = 'Receita';
            receitas[r].isGasto = false;
          } catch {
            receita_unix = 0;
          }

          if (receita_unix > gasto_unix){ //Se receita for mais recente
            try {
              temp.push(receitas[r]);
              r++;
            } catch {
            }
          }
          else { //Gasto é mais recente
            try {
              temp.push(gastos[g]);
              g++;
            } catch {
            }
          }
          console.log(gastos[i]);
          console.log(receitas[i]);
          console.log(temp);
        }
        this.items = temp;
        console.log(this.items);
      });
    });
  }

  editItem(item: any){
    let modal;

    if (item.isGasto) {
      modal = this.modalctrl.create(EditGastoPage, item);
    } else {
      modal = this.modalctrl.create(EditReceitaPage, item);
    }

    modal.onDidDismiss(() => {
      this.atualizaFeed();
    });
    modal.present();
  }
}
