import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-menu',
  templateUrl: './employee-menu.page.html',
  styleUrls: ['./employee-menu.page.scss'],
})
export class EmployeeMenuPage implements OnInit {
  selectedPath = '';
 
  pages = [
    
    {
      title: 'Employee DashBoard',//second
      url: '/employee-menu/employee-dash-board',
       icon: "home"
    },
    {
      title: ' Work Order Scan',//first
      url: '/employee-menu/work-order-scan-emp',
      icon: "barcode"
    },
    {
      title: 'View WorkOrder',//first
      url: '/employee-menu/workorder-view',
      icon: "logo-buffer"
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
