import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ManagerMenuPage } from './manager-menu.page';
import{WorkOrderFilteringByStatusPageModule} from '../../work-order/work-order-filtering-by-status/work-order-filtering-by-status.module'
const routes: Routes = [
  {
    path: '',
    component: ManagerMenuPage,
    children: [
      {
        path: 'manager-dash-board',
        loadChildren: '../manager-dash-board/manager-dash-board.module#ManagerDashBoardPageModule'
      }
      ,
      {
        path: 'scan-for-work',
        loadChildren: '../../work-order/scan-for-work/scan-for-work.module#ScanForWorkPageModule'
      }
      ,
      {
        path: 'work-order-dash-board',
        loadChildren: '../../work-order/work-order-dash-board/work-order-dash-board.module#WorkOrderDashBoardPageModule'
      },
      {
        path: 'inspection-dash-board',
        loadChildren: '../../inspection/inspection-dash-board/inspection-dash-board.module#InspectionDashBoardPageModule'
      },
      {
        path: 'find-employee',
        loadChildren: '../find-employee/find-employee.module#FindEmployeePageModule'
      },
      {
        path: 'login',
        loadChildren: '../../login/login.module#LoginPageModule'
      },
      {
        path: 'work-order-create',
        loadChildren: '../work-order-create/work-order-create.module#WorkOrderCreatePageModule'
      },
      {
        path: 'create-quick-work-order',
        loadChildren: '../../work-order/create-quick-work-order/create-quick-work-order.module#CreateQuickWorkOrderPageModule'
      },
      {
        path: 'work-order-view',
        loadChildren: '../../work-order/work-order-view/work-order-view.module#WorkOrderViewPageModule'
      },
      {
        path: 'view-inspection',
        loadChildren: '../../inspection/view-inspection/view-inspection.module#ViewInspectionPageModule'
      },
      {
        path: 'create-inspection',
        loadChildren: '../../inspection/create-inspection/create-inspection.module#CreateInspectionPageModule'
      },
      {
        path: 'workorder-filtering-by-employee',
        loadChildren: '../../work-order/workorder-filtering-by-employee/workorder-filtering-by-employee.module#WorkorderFilteringByEmployeePageModule'
      },
      {
        path: 'work-order-filtering-by-facility',
        loadChildren: '../../work-order/work-order-filtering-by-facility/work-order-filtering-by-facility.module#WorkOrderFilteringByFacilityPageModule'
      },
      {
        path: 'work-order-filtering-by-status',
        loadChildren: '../../work-order/work-order-filtering-by-status/work-order-filtering-by-status.module#WorkOrderFilteringByStatusPageModule'
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
  declarations: [ManagerMenuPage]
})
export class ManagerMenuPageModule { }
