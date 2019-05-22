import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WorkorderSupervisorViewPage } from './workorder-supervisor-view.page';

const routes: Routes = [
  {
    path: '',
    component: WorkorderSupervisorViewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WorkorderSupervisorViewPage]
})
export class WorkorderSupervisorViewPageModule {}
