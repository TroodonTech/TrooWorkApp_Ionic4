import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FindEmployeeSupervisorPage } from './find-employee-supervisor.page';

const routes: Routes = [
  {
    path: '',
    component: FindEmployeeSupervisorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FindEmployeeSupervisorPage]
})
export class FindEmployeeSupervisorPageModule {}
