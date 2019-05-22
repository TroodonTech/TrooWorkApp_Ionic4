import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WorkorderSupervisorFilteringByFacilityPage } from './workorder-supervisor-filtering-by-facility.page';

const routes: Routes = [
  {
    path: '',
    component: WorkorderSupervisorFilteringByFacilityPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WorkorderSupervisorFilteringByFacilityPage]
})
export class WorkorderSupervisorFilteringByFacilityPageModule {}
