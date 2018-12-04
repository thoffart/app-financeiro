import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { RegisterPage } from '../register/register';
import { TabsPage } from './../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  result: any;
  registerpage: any;
  loginForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private auth: AuthProvider,
    private alertctrl: AlertController
  ) {
    this.registerpage = RegisterPage;
    this.loginForm = fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }

  Login() {
    this.auth.authUser(this.loginForm.value).subscribe(
      (response: Response) => {
        console.log(response);
        this.auth.saveUserData(response);
        this.navCtrl.push(TabsPage);
      },
      error => {
        console.log(error);
        const alert = this.alertctrl.create({
          title: "Ops!",
          subTitle: error.error,
          buttons: [
            {
              text: "Ok"
            }
          ]
        });
        alert.present();
      }
    );
  }

  loadRegisterpage() { }
}
