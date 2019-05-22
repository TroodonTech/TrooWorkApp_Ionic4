import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ScanForWorkSupervisorPage } from './scan-for-work-supervisor.page';

const routes: Routes = [
  {
    path: '',
    component: ScanForWorkSupervisorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ScanForWorkSupervisorPage]
})
export class ScanForWorkSupervisorPageModule {}
