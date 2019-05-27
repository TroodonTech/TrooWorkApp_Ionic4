import { Component, OnInit } from '@angular/core';
import { WorkOrderService } from '../../../../service/work-order.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {Location} from '@angular/common';
@Component({
  selector: 'app-workorder-supervisor-view',
  templateUrl: './workorder-supervisor-view.page.html',
  styleUrls: ['./workorder-supervisor-view.page.scss'],
})
export class WorkorderSupervisorViewPage implements OnInit {
  viewworkorder;
  toServeremployeekey;
    OrganizationID;
   // loading;
  constructor(public workOrderService: WorkOrderService,
     private router: Router,private location: Location,
     public loadCtrl: LoadingController) { }

  selectedEmployees()
  {
    this.router.navigateByUrl('supervisor-menu/workorder-supervisor-filtering-by-employee');
  }
  selectedFacility()
  {
    this.router.navigateByUrl('supervisor-menu/workorder-supervisor-filtering-by-facility');
  }
  selectedStatus()
  {
    this.router.navigateByUrl('supervisor-menu/workorder-supervisor-filtering-by-status');
  }
  url_base64_decode(str) {
    var output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw new Error('Illegal base64url string!');
    }
    return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadCtrl.create({
      //spinner: 'hide',
    //  duration: 5000,
      message: 'Please wait...',
      translucent: true, 
      cssClass: 'custom-class custom-loading'
    });
     await loading.present();
     this.workOrderService.viewDashboardWorkorder(this.convert_DT(new Date()),this.toServeremployeekey, this.OrganizationID).subscribe((data: any[]) => {
      this.viewworkorder = data;
      loading.dismiss();
     });
  }
  convert_DT(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  }
  ngOnInit() 
  {
    // this.loading = true;// loading
    var token = localStorage.getItem('token');
    localStorage['token'] = token;
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
  
    this.toServeremployeekey=profile.employeekey;
    this.OrganizationID = profile.OrganizationID;
  
    
      // this.loading = false;// loading
      this.presentLoadingWithOptions();

   

  }

  GoBack() {
    //this.router.navigateByUrl('SuperVisorDashBoard');
    this.location.back();
  }

}
