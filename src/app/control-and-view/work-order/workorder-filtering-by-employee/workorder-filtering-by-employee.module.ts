import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WorkorderFilteringByEmployeePage } from './workorder-filtering-by-employee.page';

const routes: Routes = [
  {
    path: '',
    component: WorkorderFilteringByEmployeePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WorkorderFilteringByEmployeePage]
})
export class WorkorderFilteringByEmployeePageModule {}
