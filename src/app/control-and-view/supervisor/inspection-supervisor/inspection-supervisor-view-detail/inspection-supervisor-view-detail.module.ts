import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InspectionSupervisorViewDetailPage } from './inspection-supervisor-view-detail.page';

const routes: Routes = [
  {
    path: '',
    component: InspectionSupervisorViewDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InspectionSupervisorViewDetailPage]
})
export class InspectionSupervisorViewDetailPageModule {}
