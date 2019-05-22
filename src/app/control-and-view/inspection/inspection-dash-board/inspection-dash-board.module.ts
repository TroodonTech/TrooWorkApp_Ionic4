import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InspectionDashBoardPage } from './inspection-dash-board.page';

const routes: Routes = [
  {
    path: '',
    component: InspectionDashBoardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InspectionDashBoardPage]
})
export class InspectionDashBoardPageModule {}
