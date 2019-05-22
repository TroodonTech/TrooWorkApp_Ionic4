import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WorkorderSupervisorFilteringByStatusPage } from './workorder-supervisor-filtering-by-status.page';

const routes: Routes = [
  {
    path: '',
    component: WorkorderSupervisorFilteringByStatusPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WorkorderSupervisorFilteringByStatusPage]
})
export class WorkorderSupervisorFilteringByStatusPageModule {}
