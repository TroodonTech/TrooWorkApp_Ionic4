import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { ManagerTabMenuPage  } from '../../menu-tab/manager-tab-menu/manager-tab-menu.page';
import {Location} from '@angular/common';
@Component({
  selector: 'app-work-order-dash-board',
  templateUrl: './work-order-dash-board.page.html',
  styleUrls: ['./work-order-dash-board.page.scss'],
})
export class WorkOrderDashBoardPage implements OnInit {

  constructor(private router: Router,
    private location: Location) { }

  ngOnInit() {
  }
  GoBack() {
    // this.router.navigateByUrl('ManagerDashBoard');
    this.location.back();
  }
}
