import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ManagerMenuPage } from './manager-menu.page';
import{CreateInspectionPageModule} from '../../inspection/create-inspection/create-inspection.module'
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
        path: 'view-inspection',
        loadChildren: '../../inspection/view-inspection/view-inspection.module#ViewInspectionPageModule'
      },
      {
        path: 'create-inspection',
        loadChildren: '../../inspection/create-inspection/create-inspection.module#CreateInspectionPageModule'
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
