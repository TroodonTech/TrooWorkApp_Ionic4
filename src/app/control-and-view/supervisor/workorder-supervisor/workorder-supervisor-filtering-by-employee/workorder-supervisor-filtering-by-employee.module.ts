import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WorkorderSupervisorFilteringByEmployeePage } from './workorder-supervisor-filtering-by-employee.page';

const routes: Routes = [
  {
    path: '',
    component: WorkorderSupervisorFilteringByEmployeePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WorkorderSupervisorFilteringByEmployeePage]
})
export class WorkorderSupervisorFilteringByEmployeePageModule {}
