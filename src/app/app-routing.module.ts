import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import{EmployeeMenuPageModule} from './control-and-view/employee/employee-menu/employee-menu.module'

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  //{ path: 'home', loadChildren: './home/home.module#HomePageModule' },
 { path: 'login', loadChildren: './control-and-view/login/login.module#LoginPageModule' },
  
 
  { path: 'manager-menu', loadChildren: './control-and-view/manager/manager-menu/manager-menu.module#ManagerMenuPageModule' },
  { path: 'manager-dash-board', loadChildren: './control-and-view/manager/manager-dash-board/manager-dash-board.module#ManagerDashBoardPageModule' },
  { path: 'employee-menu', loadChildren: './control-and-view/employee/employee-menu/employee-menu.module#EmployeeMenuPageModule' },
  { path: 'employee-dash-board', loadChildren: './control-and-view/employee/employee-dash-board/employee-dash-board.module#EmployeeDashBoardPageModule' }, 
  { path: 'supervisor-menu', loadChildren: './control-and-view/supervisor/supervisor-menu/supervisor-menu.module#SupervisorMenuPageModule' },
  { path: 'super-visor-dash-board', loadChildren: './control-and-view/supervisor/super-visor-dash-board/super-visor-dash-board.module#SuperVisorDashBoardPageModule' },
  { path: 'work-order-create', loadChildren: './control-and-view/manager/work-order-create/work-order-create.module#WorkOrderCreatePageModule' },
  //{ path: 'scan-for-work', loadChildren: './control-and-view/work-order/scan-for-work/scan-for-work.module#ScanForWorkPageModule' },
  
  { path: 'work-order-view', loadChildren: './control-and-view/work-order/work-order-view/work-order-view.module#WorkOrderViewPageModule' },
  // { path: 'inspection-dash-board', loadChildren: './control-and-view/inspection/inspection-dash-board/inspection-dash-board.module#InspectionDashBoardPageModule' },
 
  //{ path: 'work-order-dash-board', loadChildren: './control-and-view/work-order/work-order-dash-board/work-order-dash-board.module#WorkOrderDashBoardPageModule' },
  
   { path: 'view-inspection', loadChildren: './control-and-view/inspection/view-inspection/view-inspection.module#ViewInspectionPageModule' },
  { path: 'create-inspection', loadChildren: './control-and-view/inspection/create-inspection/create-inspection.module#CreateInspectionPageModule' },
  { path: 'create-quick-work-order', loadChildren: './control-and-view/work-order/create-quick-work-order/create-quick-work-order.module#CreateQuickWorkOrderPageModule' },
 
  { path: 'file-upload/:WorkOrderKey', loadChildren: './control-and-view/work-order/file-upload/file-upload.module#FileUploadPageModule' },
  { path: 'work-order-complete/:WorkOrderKey', loadChildren: './control-and-view/employee/work-order-complete/work-order-complete.module#WorkOrderCompletePageModule' },
  { path: 'work-order-scan-emp', loadChildren: './control-and-view/employee/work-order-scan-emp/work-order-scan-emp.module#WorkOrderScanEmpPageModule' },
  { path: 'workorder-view', loadChildren: './control-and-view/employee/workorder-view/workorder-view.module#WorkorderViewPageModule' },
  { path: 'inspection-supervisor-dashboard', loadChildren: './control-and-view/supervisor/inspection-supervisor/inspection-supervisor-dashboard/inspection-supervisor-dashboard.module#InspectionSupervisorDashboardPageModule' },
  { path: 'inspection-supervisor-view', loadChildren: './control-and-view/supervisor/inspection-supervisor/inspection-supervisor-view/inspection-supervisor-view.module#InspectionSupervisorViewPageModule' },
  { path: 'inspection-supervisor-view-detail/:insKey', loadChildren: './control-and-view/supervisor/inspection-supervisor/inspection-supervisor-view-detail/inspection-supervisor-view-detail.module#InspectionSupervisorViewDetailPageModule' },
   { path: 'inspection-supervisor-inspection-completed/:insKey', loadChildren: './control-and-view/supervisor/inspection-supervisor/inspection-supervisor-inspection-completed/inspection-supervisor-inspection-completed.module#InspectionSupervisorInspectionCompletedPageModule' },
  { path: 'scan-for-work-supervisor', loadChildren: './control-and-view/supervisor/scan-for-work-supervisor/scan-for-work-supervisor.module#ScanForWorkSupervisorPageModule' },
  
  { path: 'workorder-supervisor-dashboard', loadChildren: './control-and-view/supervisor/workorder-supervisor/workorder-supervisor-dashboard/workorder-supervisor-dashboard.module#WorkorderSupervisorDashboardPageModule' },
  { path: 'workorder-supervisor-filtering-by-employee', loadChildren: './control-and-view/supervisor/workorder-supervisor/workorder-supervisor-filtering-by-employee/workorder-supervisor-filtering-by-employee.module#WorkorderSupervisorFilteringByEmployeePageModule' },
   { path: 'workorder-supervisor-filtering-by-facility', loadChildren: './control-and-view/supervisor/workorder-supervisor/workorder-supervisor-filtering-by-facility/workorder-supervisor-filtering-by-facility.module#WorkorderSupervisorFilteringByFacilityPageModule' },
   { path: 'workorder-supervisor-filtering-by-status', loadChildren: './control-and-view/supervisor/workorder-supervisor/workorder-supervisor-filtering-by-status/workorder-supervisor-filtering-by-status.module#WorkorderSupervisorFilteringByStatusPageModule' },
   { path: 'workorder-supervisor-view', loadChildren: './control-and-view/supervisor/workorder-supervisor/workorder-supervisor-view/workorder-supervisor-view.module#WorkorderSupervisorViewPageModule' },

  { path: 'workorder-supervisor-view-detail/:WorkOrderKey', loadChildren: './control-and-view/supervisor/workorder-supervisor/workorder-supervisor-view-detail/workorder-supervisor-view-detail.module#WorkorderSupervisorViewDetailPageModule' },
  { path: 'work-order-detail/:WorkOrderKey', loadChildren: './control-and-view/work-order/work-order-detail/work-order-detail.module#WorkOrderDetailPageModule' },
  { path: 'workorder-filtering-by-employee', loadChildren: './control-and-view/work-order/workorder-filtering-by-employee/workorder-filtering-by-employee.module#WorkorderFilteringByEmployeePageModule' },
  { path: 'work-order-filtering-by-facility', loadChildren: './control-and-view/work-order/work-order-filtering-by-facility/work-order-filtering-by-facility.module#WorkOrderFilteringByFacilityPageModule' },
  { path: 'work-order-filtering-by-status', loadChildren: './control-and-view/work-order/work-order-filtering-by-status/work-order-filtering-by-status.module#WorkOrderFilteringByStatusPageModule' },
  { path: 'inspection-completed/:insKey', loadChildren: './control-and-view/inspection/inspection-completed/inspection-completed.module#InspectionCompletedPageModule' },
  { path: 'view-details-inspection/:insKey', loadChildren: './control-and-view/inspection/view-details-inspection/view-details-inspection.module#ViewDetailsInspectionPageModule' },
  { path: 'view-star/:insKey', loadChildren: './control-and-view/inspection/view-star/view-star.module#ViewStarPageModule' },
  // { path: 'find-employee-supervisor', loadChildren: './control-and-view/supervisor/find-employee-supervisor/find-employee-supervisor.module#FindEmployeeSupervisorPageModule' },

  //{ path: 'find-employee', loadChildren: './control-and-view/manager/find-employee/find-employee.module#FindEmployeePageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
