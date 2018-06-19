import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListModalPage } from './list-modal';

@NgModule({
  declarations: [
    ListModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ListModalPage),
  ],
})
export class ListModalPageModule {}
