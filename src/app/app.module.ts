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

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    TabsPageModule,
    LoginPageModule,
    HomePageModule,
    TimelinePageModule,
    EditPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider
  ]
})
export class AppModule {}
