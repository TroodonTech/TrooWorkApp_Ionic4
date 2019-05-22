import { Component, OnInit } from '@angular/core';
import { WorkOrderService } from '../../../service/work-order.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {Location} from '@angular/common';
@Component({
  selector: 'app-work-order-view',
  templateUrl: './work-order-view.page.html',
  styleUrls: ['./work-order-view.page.scss'],
})
export class WorkOrderViewPage implements OnInit {
  viewworkorder;
  profile;
  toServeremployeekey;
  OrganizationID;
  //private loading: any;
  //loading: boolean;
  loading1;
  content;
  constructor(public workOrderService: WorkOrderService,
     private router: Router,
     public loadCtrl: LoadingController,
     private location: Location) { }
  
  // 
  // /********************************************* */

  // async ionViewDidEnter() {
  //    await this.presentLoading();
  //  // this.sleep(5000);
  //    await this.dismissLoading();
  // }

  // private async presentLoading() {
  //   this.loading = await this.loadCtrl.create();
  //   this.loading.present();
  // }

  // private dismissLoading() {
  //   this.loading.dismiss();
  // }

  // private sleep(milliseconds) {
  //   const start = new Date().getTime();
  //   for (let i = 0; i < 1e7; i++) {
  //     if ((new Date().getTime() - start) > milliseconds) {
  //       break;
  //     }
  //   }
  // }
  
  selectedEmployees()
  {
    this.router.navigateByUrl('workorderFilteringByEmployee');
  }
  selectedFacility()
  {
    this.router.navigateByUrl('WorkOrderFilteringByFacility');
  }
  selectedStatus()
  {
    this.router.navigateByUrl('WorkOrderFilteringByStatus');
  }
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
 

  async presentLoadingWithOptions() {
    const loading = await this.loadCtrl.create({
      //spinner: 'hide',
     // duration: 5000,
      message: 'Please wait...',
      translucent: true, 
      cssClass: 'custom-class custom-loading'
    });
     await loading.present();
     this.workOrderService.viewDashboardWorkorder(this.convert_DT(new Date()) , this.toServeremployeekey, this.OrganizationID).subscribe((data: any[]) => {
      this.viewworkorder = data;
      loading.dismiss();
     });
  }

  ngOnInit() {


  // //debugger;
    //this.loading = true;// loading
    //  this.loading1 = this.loadCtrl.create(content : "Logging in ,please wait...");
    // this.loading1.present();
    

    var token = localStorage.getItem('token');
    localStorage['token'] = token;
    var encodedProfile = token.split('.')[1];
     this.profile = JSON.parse(this.url_base64_decode(encodedProfile));
     this.toServeremployeekey = this.profile.employeekey;
     this.OrganizationID = this.profile.OrganizationID;

    // tslint:disable-next-line:max-line-length
   
     
      this.presentLoadingWithOptions();
     

   
  }
  GoBack() {
    // this.router.navigateByUrl('WorkOrderDashBoard');
    this.location.back();
  }
}
