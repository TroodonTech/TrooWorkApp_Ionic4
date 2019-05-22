import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { ManagerTabMenuPage  } from '../../menu-tab/manager-tab-menu/manager-tab-menu.page';
import {Location} from '@angular/common';

@Component({
  selector: 'app-inspection-dash-board',
  templateUrl: './inspection-dash-board.page.html',
  styleUrls: ['./inspection-dash-board.page.scss'],
})
export class InspectionDashBoardPage implements OnInit {

  constructor(private router: Router,
    private location: Location) { }

  ngOnInit() {
  }

  GoBack() {
    // this.router.navigateByUrl('ManagerDashBoard');
    this.location.back();
  }
}
