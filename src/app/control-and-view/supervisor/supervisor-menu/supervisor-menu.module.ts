import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SupervisorMenuPage } from './supervisor-menu.page';
import { } from '../workorder-supervisor/workorder-supervisor-filtering-by-employee/workorder-supervisor-filtering-by-employee.module'
// supervisor-menu/
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
      },
      {
        path: 'login',
        loadChildren: '../../login/login.module#LoginPageModule'
      },
      {
        path: 'inspection-supervisor-inspection-completed/:insKey',
        loadChildren: '../inspection-supervisor/inspection-supervisor-inspection-completed/inspection-supervisor-inspection-completed.module#InspectionSupervisorInspectionCompletedPageModule'
      },
      {
        path: 'inspection-supervisor-view-detail/:insKey',
        loadChildren: '../inspection-supervisor/inspection-supervisor-view-detail/inspection-supervisor-view-detail.module#InspectionSupervisorViewDetailPageModule'
      },
      {
        path: 'workorder-supervisor-filtering-by-employee',
        loadChildren: '../workorder-supervisor/workorder-supervisor-filtering-by-employee/workorder-supervisor-filtering-by-employee.module#WorkorderSupervisorFilteringByEmployeePageModule'
      },
      {
        path: 'workorder-supervisor-filtering-by-facility',
        loadChildren: '../workorder-supervisor/workorder-supervisor-filtering-by-facility/workorder-supervisor-filtering-by-facility.module#WorkorderSupervisorFilteringByFacilityPageModule'
      },
      {
        path: 'workorder-supervisor-filtering-by-status',
        loadChildren: '../workorder-supervisor/workorder-supervisor-filtering-by-status/workorder-supervisor-filtering-by-status.module#WorkorderSupervisorFilteringByStatusPageModule'
      },
      {
        path: 'workorder-supervisor-view-detail/:WorkOrderKey',
        loadChildren: '../workorder-supervisor/workorder-supervisor-view-detail/workorder-supervisor-view-detail.module#WorkorderSupervisorViewDetailPageModule'
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
export class SupervisorMenuPageModule { }
