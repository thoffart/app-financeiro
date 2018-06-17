import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { AuthProvider } from "../../providers/auth/auth";

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
  categorianome: string;
  categoriaid: number;
  gastoForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewctrl: ViewController,
    private fb: FormBuilder,
    private auth: AuthProvider
  ) {
    this.gastoForm = fb.group({
      descricao: new FormControl(null, [Validators.required]),
      gasto: new FormControl(null, [Validators.required]),
      pagamento: new FormControl(null, [Validators.required])
    });
    this.auth.getauthUser().subscribe(res => console.log(res));
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad GastoPage");
    this.categorianome = this.navParams.get("nome");
    this.categoriaid = this.navParams.get("id");
    console.log(this.categoriaid);
  }

  addgasto() {
    console.log(this.gastoForm);
  }

  fechar() {
    this.viewctrl.dismiss();
  }
}
