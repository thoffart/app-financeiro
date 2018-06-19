import { ListModalPage } from "./../list-modal/list-modal";
import { AuthProvider } from "./../../providers/auth/auth";
import { ApiProvider } from "./../../providers/api/api";
import { Component, AfterViewInit } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from "ionic-angular";

/**
 * Generated class for the ItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-items",
  templateUrl: "items.html"
})
export class ItemsPage implements AfterViewInit {
  check: number[] = [];
  itemInput: string;
  list: string[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private api: ApiProvider,
    private auth: AuthProvider,
    public modalCtrl: ModalController
  ) {}

  ngAfterViewInit() {
    if (this.navParams.get("lista")) {
      this.list = this.navParams.get("items");
    }
  }

  addItem(newItem: string): void {
    if (newItem) {
      this.list.unshift(newItem);
      this.check.unshift(0);
      this.itemInput = "";
    }
  }

  okItem(i: number): void {
    if (this.check[i] == 0) {
      this.check[i] = 1;
    } else {
      this.check[i] = 0;
    }
  }

  removeItem(i: number): void {
    this.list.splice(i, 1);
    this.check.splice(i, 1);
  }

  saveList() {
    let data: any;
    if (this.navParams.get("lista")) {
      data = {
        id: this.navParams.get("lista").id,
        descricao: this.list.toString(),
        email: this.auth.sendUserData().email
      };
    } else {
      data = {
        descricao: this.list.toString(),
        email: this.auth.sendUserData().email
      };
    }

    this.api.postListas(data).subscribe(response => {
      this.navCtrl.pop();
    });
  }

  finishList() {
    let contactModal = this.modalCtrl.create(
      ListModalPage,
      this.navParams.get("lista")
    );
    contactModal.onDidDismiss(() => {
      this.navCtrl.pop();
    });
    contactModal.present();
  }
}
