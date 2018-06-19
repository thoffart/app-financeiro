import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  AlertController
} from "ionic-angular";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { AuthProvider } from "../../providers/auth/auth";
import { ApiProvider } from "../../providers/api/api";

/**
 * Generated class for the GastoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-gasto",
  templateUrl: "gasto.html"
})
export class GastoPage {
  userdata: any;
  categorianome: string;
  categoriaid: number;
  gastoForm: FormGroup;
  gasto: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewctrl: ViewController,
    private fb: FormBuilder,
    private auth: AuthProvider,
    private api: ApiProvider,
    private alertctrl: AlertController
  ) {
    this.gastoForm = fb.group({
      descricao: new FormControl(null, [Validators.required]),
      valor: new FormControl(null, [Validators.required]),
      pagamento: new FormControl(null, [Validators.required])
    });
    /* this.auth.getauthUser().subscribe(res => console.log(res)); */
    this.userdata = this.auth.sendUserData();
    console.log(this.userdata);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad GastoPage");
    console.log(this.navParams);
    this.categorianome = this.navParams.get("nome");
    this.categoriaid = this.navParams.get("id");
    console.log(this.categoriaid);
  }

  addgasto() {
    console.log(this.gastoForm);
    this.gasto = this.gastoForm.value;
    this.gasto.email = this.userdata.email;
    this.gasto.catid = this.categoriaid;
    console.log(this.gasto);
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
  }

  fechar() {
    this.viewctrl.dismiss();
  }
}
