import { ApiProvider } from "./../../providers/api/api";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";

/**
 * Generated class for the SidereceitaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-sidereceita",
  templateUrl: "sidereceita.html"
})
export class SidereceitaPage {
  sortby: string = "data";
  receitas: any;
  userdata: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private api: ApiProvider,
    private auth: AuthProvider
  ) {
    this.userdata = this.auth.sendUserData();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SidereceitaPage");
    this.api
      .getReceitasFilter(this.userdata.email, this.sortby)
      .subscribe(res => {
        this.receitas = JSON.parse(res).receitas;
        console.log(this.receitas);
      });
  }

  delete(receita: any) {
    this.api.deletarReceita(receita.id).subscribe(res => {
      //Remove do BD
      var index = this.receitas.indexOf(receita); //Pega indice no front
      if (index > -1) {
        this.receitas.splice(index, 1); //Remove do front
      }
    });
  }

  onChange() {
    this.api
      .getReceitasFilter(this.userdata.email, this.sortby)
      .subscribe(res => {
        this.receitas = JSON.parse(res).receitas;
        console.log(this.receitas);
      });
  }
}
