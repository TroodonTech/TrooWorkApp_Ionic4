import { Component, OnInit } from '@angular/core';
import {WorkOrderService } from '../../../service/work-order.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {Location} from '@angular/common';
@Component({
  selector: 'app-work-order-filtering-by-status',
  templateUrl: './work-order-filtering-by-status.page.html',
  styleUrls: ['./work-order-filtering-by-status.page.scss'],
})
export class WorkOrderFilteringByStatusPage implements OnInit {
  today_DT;
  toServeremployeekey;
  OrganizationID;
  workorderStatusList;
  viewworkorder;
  temp_status;
  WorkorderStatus;
  
  private buttonColor: string = "#000 !important";
  someAction()
   {
    //debugger;
    this.buttonColor = "#FFF !important"
  }
  constructor(public workOrderService: WorkOrderService,
    private router: Router,
    public loadCtrl: LoadingController,
    private location: Location) { }
    selectedEmployees()
    {
      this.router.navigateByUrl('workorder-filtering-by-employee');
    }
    selectedFacility()
    {
      this.router.navigateByUrl('work-order-filtering-by-facility');
    }
    selectedStatus()
    {
      this.router.navigateByUrl('work-order-filtering-by-status');
    }

  url_base64_decode(str) {// decoding function for token
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

  async presentLoadingWithOptions() {//Loading status filtering page
    const loading = await this.loadCtrl.create({
      //spinner: 'hide',
    //  duration: 5000,
      message: 'Please wait...',
      translucent: true, 
      cssClass: 'custom-class custom-loading'
    });
     await loading.present();
     this.today_DT = this.convert_DT(new Date());
    this.workOrderService.statusByWorkorderDate(this.today_DT,this.toServeremployeekey,this.OrganizationID).subscribe((data: any[]) => {
      this.workorderStatusList = data;
    
      loading.dismiss();
     });
      
     
  }
  convert_DT(str) { // date convertion function YYYY/MM/DD
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  }

  to24Hour(str) {// convert time format 12 to 24
    var tokens = /([10]?\d):([0-5]\d) ([ap]m)/i.exec(str);
    if (tokens === null) {
      return null;
    }
    if (tokens[3].toLowerCase() === 'pm' && tokens[1] !== '12') {
      tokens[1] = '' + (12 + (+tokens[1]));
    } else if (tokens[3].toLowerCase() === 'am' && tokens[1] === '12') {
      tokens[1] = '00';
    }
    return tokens[1] + ':' + tokens[2];
  }

 
  getWorkorderBYStatusKey(w_statusKey)
  {

    this.today_DT = this.convert_DT(new Date());
    this.workOrderService.workorderFilterByStatusEmpView(w_statusKey,this.today_DT,this.toServeremployeekey,this.OrganizationID).subscribe((data: any[]) => {
      this.viewworkorder = data;
     //debugger;
      this.temp_status=data[0].WorkorderStatus;
     });

  }

  ngOnInit() {
    var token = localStorage.getItem('token');
    localStorage['token'] = token;
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));


   

    this.toServeremployeekey=profile.employeekey;
    this.OrganizationID = profile.OrganizationID;

   // this.getAllWorkStatus();
    this.presentLoadingWithOptions();//perform loading...
  
  }
  GoBack() {// go back option
    // this.router.navigateByUrl('WorkOrderView');
    this.location.back();
  }
}
