import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { ApiProvider } from '../../providers/api/api';
import { HomePage } from '../home/home';

/**
 * Generated class for the ListModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-modal',
  templateUrl: 'list-modal.html',
})
export class ListModalPage {

  categorias:any;
  sortby: string;
  listForm: FormGroup;
  userdata: any;
  gasto: any;
  response: string = "";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private viewctrl: ViewController,
              private fb: FormBuilder,
              private api: ApiProvider,
              private auth: AuthProvider,
              private alertctrl: AlertController,
            ) {

              this.userdata = this.auth.sendUserData();
              this.listForm = fb.group({
                catid : new FormControl,
                valor: new FormControl(null, [Validators.required]),
                pagamento: new FormControl(null, [Validators.required])     
              });
  }

  ionViewDidLoad(){
    this.api.getCategoriasLista().subscribe(res => {
      this.categorias = res.categorias;
    });
  }

  saveGasto() {
    this.gasto = this.listForm.value;
    this.gasto['descricao'] = this.navParams.get('descricao');
    this.gasto['email'] = this.navParams.get('email');
    let lista_id = this.navParams.get('id');
    

    this.api.postGasto(this.gasto).subscribe(
      res => {
        const alert = this.alertctrl.create({
          title: "Gasto registrado!",
          buttons: [
            {
              text: "Ok",
              handler: () => {
                this.viewctrl.dismiss();
              }
            }
          ]
        });
        alert.present();
      },
      error => {
        const alert = this.alertctrl.create({
          title: "Ops!",
          subTitle: "Algo deu errado",
          message: "Por favor, tente novamente mais tarde.",
          buttons: [
            {
              text: "Ok"
            }
          ]
        });
        alert.present();
      }
    );

    if(lista_id) {
      this.api.deleteListas(lista_id).subscribe( res => {
        this.navCtrl.pop();
      });
    }

  }        

  fechar() {
    this.viewctrl.dismiss();
  }

}
