import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SuperVisorDashBoardPage } from './super-visor-dash-board.page';

const routes: Routes = [
  {
    path: '',
    component: SuperVisorDashBoardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SuperVisorDashBoardPage]
})
export class SuperVisorDashBoardPageModule {}
