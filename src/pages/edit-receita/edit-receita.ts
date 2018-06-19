import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the EditReceitaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-receita',
  templateUrl: 'edit-receita.html',
})
export class EditReceitaPage {
  userdata: any;
  receitaForm: FormGroup;
  data: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private fb: FormBuilder,
    private auth: AuthProvider,
    private api: ApiProvider,
    private alertctrl: AlertController,
    private viewctrl: ViewController
  ) {
    this.receitaForm = fb.group({
      descricao: new FormControl(null, [Validators.required]),
      valor: new FormControl(null, [Validators.required])
    });
    this.userdata = this.auth.sendUserData();
    this.data = this.navParams.data;
    console.log(this.data);
  }

  editReceita(){
    console.log(this.receitaForm);
    let receita = this.receitaForm.value;
    receita.email = this.userdata.email;
    receita.id = this.data.id;
    console.log(receita);

    this.api.updateReceita(receita).subscribe(res => {
        const alert = this.alertctrl.create({
          title: "Receita Alterada!",
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
          message: "Error ao Alterar Receita!!",
          buttons: [
            {
              text: "Ok"
            }
          ]
        });
        alert.present();
      }
    );
  }

  fechar() {
    this.viewctrl.dismiss();
  }
}
