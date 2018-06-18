import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { AuthProvider } from "../../providers/auth/auth";
import { ApiProvider } from "../../providers/api/api";

/**
 * Generated class for the ReceitaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-receita",
  templateUrl: "receita.html"
})
export class ReceitaPage {
  userdata: any;
  categorianome: string;
  categoriaid: number;
  receitaForm: FormGroup;
  receita: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewctrl: ViewController,
    private fb: FormBuilder,
    private auth: AuthProvider,
    private api: ApiProvider
  ) {
    this.receitaForm = fb.group({
      descricao: new FormControl(null, [Validators.required]),
      valor: new FormControl(null, [Validators.required])
    });
    /* this.auth.getauthUser().subscribe(res => console.log(res)); */
    this.userdata = this.auth.sendUserData();
    console.log(this.userdata);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ReceitaPage");
    this.categorianome = this.navParams.get("nome");
    this.categoriaid = this.navParams.get("id");
    console.log(this.categoriaid);
  }

  receitaform() {
    console.log(this.receitaForm);
    this.receita = this.receitaForm.value;
    this.receita.email = this.userdata.email;
    console.log(this.receita);
    this.api.postReceita(this.receita).subscribe(res => {
      console.log(res);
      this.viewctrl.dismiss();
    });
  }

  fechar() {
    this.viewctrl.dismiss();
  }
}
