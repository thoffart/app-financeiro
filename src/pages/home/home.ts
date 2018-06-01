import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  categorias = [
    "Alimentação",
    "Animal de estimação",
    "Casa",
    "Educação",
    "Gastos Pessoais",
    "Impostos",
    "Lazer",
    "Receita",
    "Saúde",
    "Seguros",
    "Serviços Financeiros",
    "Transporte"
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad HomePage");
  }
}
