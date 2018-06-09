import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad RegisterPage");
  }
}
