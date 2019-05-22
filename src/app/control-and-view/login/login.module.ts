import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
//import { TranslateModule } from '@ngx-translate/core';
import{ManagerMenuPageModule}from '../manager/manager-menu/manager-menu.module'
import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginPage],
  schemas:      [ CUSTOM_ELEMENTS_SCHEMA ],
  exports:      [
     //TranslateModule
     LoginPage ]
})
export class LoginPageModule {}
