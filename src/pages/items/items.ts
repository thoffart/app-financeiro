import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";

/**
 * Generated class for the ItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-items',
  templateUrl: 'items.html',
})
export class ItemsPage {

  // itemForm: FormGroup;
  // items: FormArray;
  check: boolean = false;
  itemInput: string;
  list: string[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder) {

    // this.itemForm = this.fb.group({
    //   listName: '',
    //   items: this.fb.array([ this.createItem() ]),
    // });

  }

  createItem(): FormGroup {

    return this.fb.group({
      name: '',
    });

  }

  // addItem(): void {
  //
  //   this.items = this.itemForm.get('items') as FormArray;
  //   this.items.push(this.createItem());
  //   this.check = true;
  //
  // }

  addItem(newItem: string): void {

    if(newItem) {
      this.list.push(newItem);
      this.itemInput = '';
    }

  }

  okItem(): void {
    this.list.push('funfou');
  }

}
