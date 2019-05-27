import { Component, OnInit } from '@angular/core';
import {WorkOrderService } from '../../../service/work-order.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {Location} from '@angular/common';
@Component({
  selector: 'app-workorder-filtering-by-employee',
  templateUrl: './workorder-filtering-by-employee.page.html',
  styleUrls: ['./workorder-filtering-by-employee.page.scss'],
})
export class WorkorderFilteringByEmployeePage implements OnInit {
  active;
  showFacilityAccordion;
  toServeremployeekey;
  OrganizationID;
  employeeList;
  today_DT;
  workorderStatusList;
  viewworkorder;
  temp_status;
  shownGroup;
  constructor(public workOrderService: WorkOrderService,
    private router: Router,
    public loadCtrl: LoadingController,
    private location: Location) { }

  selectedEmployees()
  {
    this.router.navigateByUrl('manager-menu/workorder-filtering-by-employee');
  }
  selectedFacility()
  {
    this.router.navigateByUrl('manager-menu/work-order-filtering-by-facility');
  }
  selectedStatus()
  {
    this.router.navigateByUrl('manager-menu/work-order-filtering-by-status');
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

  async presentLoadingWithOptions() {//Loading employee filtering page
    const loading = await this.loadCtrl.create({
     // spinner: 'hide',
    //  duration: 5000,
      message: 'Please wait...',
      translucent: true, 
      cssClass: 'custom-class custom-loading'
    });
     await loading.present();
     this.today_DT = this.convert_DT(new Date());
     this.workOrderService.allemployees(this.toServeremployeekey,this.OrganizationID).subscribe((data: any[]) => {
      this.employeeList = data;
     
  
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


  getAllEmployee()
  {
    this.active = 'employeeFilter';
   this.showFacilityAccordion =true;

   this.workOrderService.allemployees(this.toServeremployeekey,this.OrganizationID).subscribe((data: any[]) => {
    this.employeeList = data;
   });


  }

  ngOnInit() {

    var token = localStorage.getItem('token');
    localStorage['token'] = token;
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));


   

    this.toServeremployeekey=profile.employeekey;
    this.OrganizationID = profile.OrganizationID;
  
    this.getAllEmployee();
    this.presentLoadingWithOptions();

  }

  toggleGroup(EmployeeKey)
  {

   

    this.today_DT = this.convert_DT(new Date());

    this.workOrderService.getStatusListByEmployeeKey(this.today_DT,EmployeeKey,this.toServeremployeekey,this.OrganizationID)
    .subscribe((data: any[]) => {
     // debugger;
      this.workorderStatusList=data;
    });


  }
  isGroupShown(group)
  {
    return this.shownGroup === group;

  }
  
  getWorkorderByStatusEmployeeKey(EmployeeKey,WorkorderStatusKey)//get status of employee
  {
   //debugger;
    this.showFacilityAccordion = false;
  this.today_DT = this.convert_DT(new Date());

  this.workOrderService.getWorkorderByStatusEmployeeKey(EmployeeKey,WorkorderStatusKey,this.today_DT,this.toServeremployeekey,this.OrganizationID)
  .subscribe((data: any[]) => {
    this.viewworkorder=data;
    this.temp_status=data[0].WorkorderStatus;
  });

}
GoBack() {// go back option
  // this.router.navigateByUrl('WorkOrderView');
  this.location.back();
}

}