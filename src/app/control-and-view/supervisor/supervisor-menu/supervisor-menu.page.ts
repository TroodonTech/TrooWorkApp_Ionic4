import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supervisor-menu',
  templateUrl: './supervisor-menu.page.html',
  styleUrls: ['./supervisor-menu.page.scss'],
})
export class SupervisorMenuPage implements OnInit {
  selectedPath = '';
 
  pages = [
    
    {
      title: 'Supervisor DashBoard',//second
      url: '/supervisor-menu/super-visor-dash-board',
      icon: "home"
    },
   
    {
      title: 'View WorkOrder',//first
      url: '/supervisor-menu/workorder-supervisor-view',
      icon: "logo-buffer"
    },
    {
      title: 'Scan For Work',//first
      url: '/supervisor-menu/scan-for-work-supervisor',
      icon: "barcode"
    } ,
    {
      title: ' View Inspection',//first
      url: '/supervisor-menu/inspection-supervisor-view',
      icon: "create"
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
