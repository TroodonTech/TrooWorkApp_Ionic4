import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WorkorderSupervisorDashboardPage } from './workorder-supervisor-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: WorkorderSupervisorDashboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WorkorderSupervisorDashboardPage]
})
export class WorkorderSupervisorDashboardPageModule {}
