import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WorkOrderDetailPage } from './work-order-detail.page';

const routes: Routes = [
  {
    path: '',
    component: WorkOrderDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WorkOrderDetailPage]
})
export class WorkOrderDetailPageModule {}
