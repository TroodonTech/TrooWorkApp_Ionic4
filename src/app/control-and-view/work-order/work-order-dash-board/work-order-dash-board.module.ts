import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WorkOrderDashBoardPage } from './work-order-dash-board.page';

const routes: Routes = [
  {
    path: '',
    component: WorkOrderDashBoardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WorkOrderDashBoardPage]
})
export class WorkOrderDashBoardPageModule {}
