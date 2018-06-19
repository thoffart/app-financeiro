import { GastoPageModule } from "./../pages/gasto/gasto.module";
import { HttpClientModule } from "@angular/common/http";
import { RegisterPageModule } from "./../pages/register/register.module";
import { TabsPageModule } from "./../pages/tabs/tabs.module";
import { LoginPageModule } from "./../pages/login/login.module";
import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

import { MyApp } from "./app.component";
import { AuthProvider } from "../providers/auth/auth";
import { HomePageModule } from "../pages/home/home.module";
import { EditPageModule } from "../pages/edit/edit.module";
import { TimelinePageModule } from "../pages/timeline/timeline.module";
import { ApiProvider } from "../providers/api/api";
import { ListPageModule } from "../pages/list/list.module";
import { ItemsPageModule } from "../pages/items/items.module";
import { ReceitaPageModule } from "../pages/receita/receita.module";
import { EditGastoPageModule } from "../pages/edit-gasto/edit-gasto.module";
import { EditReceitaPageModule } from "../pages/edit-receita/edit-receita.module";
import { SidegastoPageModule } from "../pages/sidegasto/sidegasto.module";
import { SidereceitaPageModule } from "../pages/sidereceita/sidereceita.module";

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    TabsPageModule,
    LoginPageModule,
    RegisterPageModule,
    HomePageModule,
    TimelinePageModule,
    GastoPageModule,
    ReceitaPageModule,
    HttpClientModule,
    EditPageModule,
    ListPageModule,
    ItemsPageModule,
    EditGastoPageModule,
    EditReceitaPageModule,
    SidegastoPageModule,
    SidereceitaPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    ApiProvider
  ]
})
export class AppModule {}
