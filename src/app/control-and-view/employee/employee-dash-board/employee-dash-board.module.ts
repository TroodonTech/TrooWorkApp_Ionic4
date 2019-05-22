import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EmployeeDashBoardPage } from './employee-dash-board.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeeDashBoardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EmployeeDashBoardPage]
})
export class EmployeeDashBoardPageModule {}
