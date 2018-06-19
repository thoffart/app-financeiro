import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the EditGastoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-gasto',
  templateUrl: 'edit-gasto.html',
})
export class EditGastoPage {
  userdata: any;
  gastoForm: FormGroup;
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
      this.gastoForm = fb.group({
        descricao: new FormControl(null, [Validators.required]),
        valor: new FormControl(null, [Validators.required]),
        pagamento: new FormControl(null, [Validators.required])
      });
      this.userdata = this.auth.sendUserData();
      this.data = this.navParams.data;
      console.log(this.data);
  }

  editGasto() {
    console.log(this.gastoForm);
    let gasto = this.gastoForm.value;
    gasto.email = this.userdata.email;
    gasto.id = this.data.id;
    console.log(gasto);

    this.api.updateGasto(gasto).subscribe(res => {
        const alert = this.alertctrl.create({
          title: "Gasto Alterado!",
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
          message: "Error ao Alterar Gasto!!",
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
