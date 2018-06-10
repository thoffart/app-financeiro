import { AuthProvider } from "./../../providers/auth/auth";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";

@IonicPage()
@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage {
  slides = [
    {
      description: "Controle Seu Dinheiro!",
      icon: "fa fa-money"
    },
    {
      description: "Veja seus ultimos gastos com sua TimeLine!",
      icon: "fa fa-clock-o"
    },
    {
      description: "Crie listas personalizadas!",
      icon: "fa fa-list-ul"
    }
  ];
  registerForm: FormGroup;
  bcheck = true;
  cccheck = true;
  cdcheck = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private auth: AuthProvider
  ) {
    this.registerForm = fb.group({
      nome: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      nascimento: new FormControl(null, [Validators.required]),
      boleto: new FormControl(null),
      ccredito: new FormControl(null),
      cdebito: new FormControl(null)
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad RegisterPage");
  }

  Registrar() {
    console.log("asioe");
    console.log(this.registerForm);
    this.auth.postUser(this.registerForm.value).subscribe();
  }
}
