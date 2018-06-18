import { AuthProvider } from './../../providers/auth/auth';
import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  listas:any = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private api: ApiProvider,
              private auth: AuthProvider
  ) {}

  ionViewWillEnter(){
    this.api.getListas(this.auth.sendUserData().email).subscribe(response => {
      this.listas = JSON.parse(response);
      this.listas = this.listas.listas;
    });
  }

  openList(lista: any) {
    let items = lista.descricao.split(',');
    this.navCtrl.push('ItemsPage', {
      'items': items, 
      'lista': lista
    });
  }

  createList() {
    this.navCtrl.push('ItemsPage', null);
  }

  deleteList(lista: any) {
    this.api.deleteListas(lista.id).subscribe(response => {
      this.api.getListas(this.auth.sendUserData().email).subscribe(response => {
        this.listas = JSON.parse(response);
        this.listas = this.listas.listas;
      });
    });
  }

  

}
