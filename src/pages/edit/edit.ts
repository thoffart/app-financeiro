import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { TabsPage } from '../tabs/tabs';


/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  editForm: FormGroup;
  bcheck = true;
  cccheck = true;
  cdcheck = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private auth: AuthProvider,
  ) {
    this.editForm = fb.group({
      nome: new FormControl(null),
      password: new FormControl(null),
      nascimento: new FormControl(null),
      boleto: new FormControl(null),
      ccredito: new FormControl(null),
      cdebito: new FormControl(null)
    });
  }

  Edit() {
    let user = this.auth.sendUserData();

    if (this.editForm.value.nome) {
      user.nome = this.editForm.value.nome;
    }
    if (this.editForm.value.password) {
      user.password = this.editForm.value.password;
    }
    if (this.editForm.value.nascimento) {
      user.nascimento = this.editForm.value.nascimento; 
    }
    user.boleto = this.bcheck;
    user.cdebito = this.cdcheck;
    user.ccredito = this.cccheck;

    console.log(user.nome);
    let request = {
      "nome": user.nome,
      "email": user.email,
      "password": user.password,
      "nascimento": user.nascimento,
      "ccredito": user.boleto,
      "cdebito": user.cdebito,
      "boleto": user.ccredito
    }

    this.auth.patchUser(request).subscribe( response => {
      this.navCtrl.push(TabsPage);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }

}
