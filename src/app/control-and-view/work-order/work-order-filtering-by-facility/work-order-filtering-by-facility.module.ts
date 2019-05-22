import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WorkOrderFilteringByFacilityPage } from './work-order-filtering-by-facility.page';

const routes: Routes = [
  {
    path: '',
    component: WorkOrderFilteringByFacilityPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WorkOrderFilteringByFacilityPage]
})
export class WorkOrderFilteringByFacilityPageModule {}
