import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
@Component({
  selector: 'app-workorder-supervisor-dashboard',
  templateUrl: './workorder-supervisor-dashboard.page.html',
  styleUrls: ['./workorder-supervisor-dashboard.page.scss'],
})
export class WorkorderSupervisorDashboardPage implements OnInit {

  constructor(private router: Router,private location: Location) { }

  ngOnInit() {
  }
  GoBack() {
   // this.router.navigateByUrl('SuperVisorDashBoard');
   this.location.back();
  }

}
