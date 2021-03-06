import { TabsPage } from "./../pages/tabs/tabs";
import { LoginPage } from "./../pages/login/login";
import { Component, ViewChild } from "@angular/core";
import { Platform, NavController, MenuController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { EditPage } from "../pages/edit/edit";
import { SidereceitaPage } from "../pages/sidereceita/sidereceita";
import { SidegastoPage } from "../pages/sidegasto/sidegasto";
@Component({
  templateUrl: "app.html"
})
export class MyApp {
  tabsPage = TabsPage;
  settingsPage = EditPage;
  sideReceita = SidereceitaPage;
  sideGasto = SidegastoPage;
  loginPage: any = LoginPage;
  @ViewChild("nav") nav: NavController;
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menuctrl: MenuController
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuctrl.close();
  }

  logOut() {
    this.nav.setRoot(this.loginPage);
    this.nav.popToRoot();
    this.menuctrl.close();
  }
}
