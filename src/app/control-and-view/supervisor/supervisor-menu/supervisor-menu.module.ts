import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SupervisorMenuPage } from './supervisor-menu.page';
import {SuperVisorDashBoardPageModule} from '../super-visor-dash-board/super-visor-dash-board.module'
const routes: Routes = [
  {
    path: '',
    component: SupervisorMenuPage,
  
    children: [
      {
        path: 'super-visor-dash-board',
        loadChildren: '../super-visor-dash-board/super-visor-dash-board.module#SuperVisorDashBoardPageModule'
       },
       {
        path: 'inspection-supervisor-view',
        loadChildren: '../inspection-supervisor/inspection-supervisor-view/inspection-supervisor-view.module#InspectionSupervisorViewPageModule'
      },
      {
        path: 'scan-for-work-supervisor',
        loadChildren: '../scan-for-work-supervisor/scan-for-work-supervisor.module#ScanForWorkSupervisorPageModule'
      },
      {
        path: 'workorder-supervisor-view',
        loadChildren: '../workorder-supervisor/workorder-supervisor-view/workorder-supervisor-view.module#WorkorderSupervisorViewPageModule'
      }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SupervisorMenuPage]
})
export class SupervisorMenuPageModule {}
