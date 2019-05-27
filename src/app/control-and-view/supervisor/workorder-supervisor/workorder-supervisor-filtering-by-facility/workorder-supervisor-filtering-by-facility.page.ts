import { Component, OnInit } from '@angular/core';
import {WorkOrderService } from '../../../../service/work-order.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {Location} from '@angular/common';
@Component({
  selector: 'app-workorder-supervisor-filtering-by-facility',
  templateUrl: './workorder-supervisor-filtering-by-facility.page.html',
  styleUrls: ['./workorder-supervisor-filtering-by-facility.page.scss'],
})
export class WorkorderSupervisorFilteringByFacilityPage implements OnInit {

  toServeremployeekey;
  OrganizationID;
  facilityList;
  zoneByFacilityKeyList;
  temp_floorkey;
  floorListByZoneFacility;
  today_DT;
  viewworkorder;
  FacilityKey;
  FloorKey;
  ZoneKey;


  constructor(public workOrderService: WorkOrderService,
    private router: Router,
    private location: Location,
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


  async presentLoadingWithOptions() {
    const loading = await this.loadCtrl.create({
      //spinner: 'hide',
    //  duration: 5000,
      message: 'Please wait...',
      translucent: true, 
      cssClass: 'custom-class custom-loading'
    });
     await loading.present();
     this.workOrderService.getBuilding(this.toServeremployeekey,this.OrganizationID).subscribe((data: any[]) => {
      this.facilityList = data;
      loading.dismiss();
     });
      
     
  }

  getAllFacility()
  {
  
   
  }
  getFloorByFacilityKey(facilitykey)
  {
  ;

    this.workOrderService.floorByFacility(facilitykey,this.OrganizationID).subscribe((data: any[]) => {
      this.zoneByFacilityKeyList = data;
     });
  }

  toggleGroup(facilitykey)
  {

  }

  getZoneByFacilityFloorKey(facilitykey,floorkey,group)
  {
    this.temp_floorkey=floorkey;
    this.workOrderService.zoneByFacility_Floor(facilitykey,floorkey,this.OrganizationID).subscribe((data: any[]) => {
      this.floorListByZoneFacility = data;
     });
    //  this.FacilityKey="";
    //  this.FloorKey="";
    //  this.ZoneKey="";
  }

  getAllWorkorderByFacilityFloorZone(facilitykey,zonekey,floorkey)
  {
    this.today_DT = this.convert_DT(new Date());
    this.workOrderService.viewworkorderFilterByFacility(facilitykey,zonekey,floorkey,this.today_DT,this.toServeremployeekey,this.OrganizationID).subscribe((data: any[]) => {
      this.viewworkorder = data;
     });
    //  this.FacilityKey="";
    //  this.FloorKey="";
    //   this.ZoneKey="";
     // this.getAllWorkorderByFacilityFloorZone(facilitykey,zonekey,floorkey);

  }
  ngOnInit() {
    var token = localStorage.getItem('token');
    localStorage['token'] = token;
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));


   

    this.toServeremployeekey=profile.employeekey;
    this.OrganizationID = profile.OrganizationID;
    this.getAllFacility();
    this.presentLoadingWithOptions();

   
  }
  GoBack() {// go back option
    //this.router.navigateByUrl('workorder_Supervisor_View');]
    this.location.back();
  }

}
