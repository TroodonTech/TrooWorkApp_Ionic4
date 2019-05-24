import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
@Component({
  selector: 'app-manager-menu',
  templateUrl: './manager-menu.page.html',
  styleUrls: ['./manager-menu.page.scss'],
})
export class ManagerMenuPage implements OnInit {
  selectedPath = '';

  pages = [

    {
      title: 'Manager DashBoard',//second
      url: '/manager-menu/manager-dash-board',
      icon: 'home'
    },
    {
      title: 'Find Employee',//second
      url: '/manager-menu/find-employee',
      icon: 'search'
    },
    {
      title: ' Work Order',//first
      url: '/manager-menu/work-order-dash-board',
      icon: "logo-buffer"
    },
    {
      title: 'Scan For Work',//first
      url: '/manager-menu/scan-for-work',
      icon: "barcode"
    },
    {
      title: 'Inspection Order',
      url: '/manager-menu/inspection-dash-board',
      icon: "create"
    }

  ];

  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
  }

  ngOnInit() {

  }

}
