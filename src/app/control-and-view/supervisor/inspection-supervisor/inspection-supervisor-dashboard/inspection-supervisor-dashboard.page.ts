import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
@Component({
  selector: 'app-inspection-supervisor-dashboard',
  templateUrl: './inspection-supervisor-dashboard.page.html',
  styleUrls: ['./inspection-supervisor-dashboard.page.scss'],
})
export class InspectionSupervisorDashboardPage implements OnInit {

  constructor(private router: Router,private location: Location) { }

  ngOnInit() {
  }
  GoBack() {
   // this.router.navigateByUrl('SuperVisorDashBoard');
   this.location.back();
  }


}
