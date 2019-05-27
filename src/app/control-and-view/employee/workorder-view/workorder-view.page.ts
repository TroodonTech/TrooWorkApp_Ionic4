import { Component, OnInit } from '@angular/core';
import { WorkOrderService } from '../../../service/work-order.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {Location} from '@angular/common';
@Component({
  selector: 'app-workorder-view',
  templateUrl: './workorder-view.page.html',
  styleUrls: ['./workorder-view.page.scss'],
})
export class WorkorderViewPage implements OnInit {
  viewworkorder;
  profile;
  toServeremployeekey;
  OrganizationID;
 // loading;

 //rootPage:any =TabsEmployeePage;
  constructor(public workOrderService: WorkOrderService,
    private router: Router,
    public loadCtrl: LoadingController
    ,private location: Location) { }
  convert_DT(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
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
    return window.atob(output);
  }
  workorderredirect(WorkorderKey)
  {
    this.router.navigate(['employee-menu/work-order-complete',WorkorderKey]);
  }
  async presentLoadingWithOptions() {
    const loading = await this.loadCtrl.create({
      //spinner: 'hide',
      duration: 5000,
      message: 'Please wait...',
      translucent: true, 
      cssClass: 'custom-class custom-loading'
    });
     await loading.present();
     this.workOrderService.viewDashboardWorkorder(this.convert_DT(new Date()), this.toServeremployeekey, this.OrganizationID).subscribe((data: any[]) => {
      this.viewworkorder = data;
      loading.dismiss();
     });
  }
  ngOnInit() {
   //debugger;
    // this.loading=true;
    console.log('inside oninit');
    var token = localStorage.getItem('token');
    localStorage['token'] = token;
    var encodedProfile = token.split('.')[1];
     this.profile = JSON.parse(this.url_base64_decode(encodedProfile));
     this.toServeremployeekey = this.profile.employeekey;
     this.OrganizationID = this.profile.OrganizationID;
    
      // this.loading=false;
      this.presentLoadingWithOptions();
    
  }
  GoBack() {
    // this.router.navigateByUrl('EmployeeDashBoard');
    this.location.back();
  }

}
