import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ManagerDashBoardPage } from './manager-dash-board.page';

const routes: Routes = [
  {
    path: '',
    component: ManagerDashBoardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ManagerDashBoardPage]
})
export class ManagerDashBoardPageModule {}
