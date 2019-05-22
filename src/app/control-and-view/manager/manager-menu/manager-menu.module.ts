import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ManagerMenuPage } from './manager-menu.page';
//import {ManagerDashBoardPageModule} from '../../work-order'
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
      }
      
    ]}
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
export class ManagerMenuPageModule {}
