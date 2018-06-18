import { ApiProvider } from './../../providers/api/api';
import { Component, AfterViewInit } from '@angular/core';
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
export class ListPage implements AfterViewInit {

  listas:any[] = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private api: ApiProvider
  ) {}

  ngAfterViewInit() {
    this.api.getListas("all").subscribe(response => {
      this.listas = JSON.parse(response);
      if (this.listas) {
        this.listas = this.listas.listas;
      }
    });
  }

  openList(lista: any) {
    this.navCtrl.push('ItemsPage', lista);
  }

  createList() {
    this.navCtrl.push('ItemsPage', null);
  }

}
