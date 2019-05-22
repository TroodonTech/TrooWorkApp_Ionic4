import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WorkOrderScanEmpPage } from './work-order-scan-emp.page';

const routes: Routes = [
  {
    path: '',
    component: WorkOrderScanEmpPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WorkOrderScanEmpPage]
})
export class WorkOrderScanEmpPageModule {}
