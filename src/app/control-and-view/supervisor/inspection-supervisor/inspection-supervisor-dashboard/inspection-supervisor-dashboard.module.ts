import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InspectionSupervisorDashboardPage } from './inspection-supervisor-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: InspectionSupervisorDashboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InspectionSupervisorDashboardPage]
})
export class InspectionSupervisorDashboardPageModule {}
