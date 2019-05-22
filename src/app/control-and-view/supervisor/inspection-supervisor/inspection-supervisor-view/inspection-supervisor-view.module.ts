import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InspectionSupervisorViewPage } from './inspection-supervisor-view.page';

const routes: Routes = [
  {
    path: '',
    component: InspectionSupervisorViewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InspectionSupervisorViewPage]
})
export class InspectionSupervisorViewPageModule {}
