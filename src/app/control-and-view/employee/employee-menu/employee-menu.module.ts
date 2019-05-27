import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EmployeeMenuPage } from './employee-menu.page';
import {WorkOrderCompletePageModule} from '../work-order-complete/work-order-complete.module'
const routes: Routes = [
  {
    path: '',
    component: EmployeeMenuPage,
  
    children: [
      {
        path: 'employee-dash-board',
        loadChildren: '../employee-dash-board/employee-dash-board.module#EmployeeDashBoardPageModule'
       }
      ,
      {
        path: 'work-order-scan-emp',
        loadChildren: '../work-order-scan-emp/work-order-scan-emp.module#WorkOrderScanEmpPageModule'
      }
      ,
      {
        path: 'workorder-view',
        loadChildren: '../workorder-view/workorder-view.module#WorkorderViewPageModule'
      },
      {
        path: 'work-order-complete/:WorkOrderKey',
        loadChildren: '../work-order-complete/work-order-complete.module#WorkOrderCompletePageModule'
      },
      {
        path: 'login',
        loadChildren: '../../login/login.module#LoginPageModule'
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
  declarations: [EmployeeMenuPage]
})
export class EmployeeMenuPageModule {}
