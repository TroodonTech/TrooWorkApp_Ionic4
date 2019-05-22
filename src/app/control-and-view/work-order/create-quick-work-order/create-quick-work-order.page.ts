import { Component, OnInit } from '@angular/core';
import { WorkOrderService } from '../../../service/work-order.service';
import { Router } from '@angular/router';
import {AlertController} from '@ionic/angular';
import {Location} from '@angular/common';
@Component({
  selector: 'app-create-quick-work-order',
  templateUrl: './create-quick-work-order.page.html',
  styleUrls: ['./create-quick-work-order.page.scss'],
})
export class CreateQuickWorkOrderPage implements OnInit {
  facilityList;
  priorityList;
  employeeList;

  EmployeeKey;
  WorkorderNotes;
  FacilityKey;
  PriorityKey;
  isPhotoRequired;

  createworkorder;

  // temp-variables
  wot;
  notes;
  facilityString;
  zone;
  eqp_key;
  shift;
  emp_key;
  priority;
  isReccuring;
  isrecurring; // for setting bit value 1 or 0
  startDT;
  endDT;
  workTime;
  dailyRecc_gap; // dailyreccuringGap
  is_PhotoRequired;
  is_BarcodeRequired;
  occurenceinstance;

  intervaltype;
  repeatinterval;
  occursonday;

  toServeremployeekey;
    OrganizationID;

  workorderCreation;

  async WorkNotesAlert() {
    const alert = await this.alertController.create({
      header: 'Quick Workorder Creation',
      subHeader: '',
      message: 'Work order notes is not provided!',
      buttons: ['OK']
    });

    await alert.present();
  }

  async FacilityAlert() {
    const alert = await this.alertController.create({
      header: 'Quick Workorder Creation',
      subHeader: '',
      message: 'Facility is not provided!',
      buttons: ['OK']
    });

    await alert.present();
  }

  async EmpAlert() {
    const alert = await this.alertController.create({
      header: 'Quick Workorder Creation',
      subHeader: '',
      message: 'Employee is not provided!',
      buttons: ['OK']
    });

    await alert.present();
  }

  async PresentAlert() {
    const alert = await this.alertController.create({
      header: 'Successfully Added!',
      subHeader: '',
      message: '',
      buttons: ['OK']
    });

    await alert.present();
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

  constructor(public workOrderService: WorkOrderService, 
    private router: Router,
    public alertController: AlertController,
    private location: Location) { }
  convert_DT(str) {// reduce one day for display
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  }
  ngOnInit() {

    this.EmployeeKey="";
    this.FacilityKey="";

    this.PriorityKey="";

    var token = localStorage.getItem('token');
    localStorage['token'] = token;
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));


   // var token = localStorage.getItem('token');
    //localStorage['token'] = token;
    // var encodedProfile = token.split('.')[1];
    // var profile = JSON.parse(this.url_base64_decode(encodedProfile));

    this.toServeremployeekey=profile.employeekey;
    this.OrganizationID = profile.OrganizationID;

    


    this.workOrderService.getBuilding(this. toServeremployeekey,this.OrganizationID)
    .subscribe((data: any[]) => {

      this.facilityList = data;
    });
    this.workOrderService.priorityList(this.OrganizationID).subscribe((data: any[]) => {
      this.priorityList = data;

    });
    this.workOrderService.allemployees(this. toServeremployeekey,this.OrganizationID).subscribe((data: any[]) => {
      this.employeeList = data;

    });
  }

  newWorkordersave() {
   //debugger;
    this.wot = - 1;
    this.startDT = this.convert_DT(new Date());
    var d = new Date();
    var datetext = d.toTimeString();
    datetext = datetext.split(' ')[0];
    this.workTime = datetext;
    this.is_BarcodeRequired = 0;
    
    if (this.EmployeeKey) {
      this.emp_key = this.EmployeeKey;
    } else {
      this.emp_key = - 1;
      this.EmpAlert();
      return;
    }



    if (this.WorkorderNotes) {
      this.notes = this.WorkorderNotes;
    }
     else 
     {
      this.notes = null;
      this.WorkNotesAlert();
      return;

    }


    var facilityString;
    if (this.FacilityKey)
     {
      facilityString = this.FacilityKey;
    }
    else
    {
      this.FacilityAlert();
      return;
    }

   


    if (this.PriorityKey) {
      this.priority = this.PriorityKey;
    } else {
      this.priority = - 1;
    }
    if (this.isPhotoRequired) {
      this.is_PhotoRequired = 1;
    } else {
      this.is_PhotoRequired = 0;
    }

    this.createworkorder = {

      workorderkey: - 99,
      workordertypekey: - 1,
      equipmentkey: - 1,
      roomkeys: '-1',
      facilitykeys: facilityString,
      floorkeys: '-1',
      zonekeys: '-1',
      roomtypekeys: '-1',
      employeekey: this.emp_key,
      priority: this.priority,
      fromdate: this.startDT,
      todate: this.startDT,
      intervaltype: '0',
      repeatinterval: 1,
      occursonday: null,
      occursontime: this.workTime,
      occurstype: null,
      workordernote: this.notes,
      isbar: this.is_BarcodeRequired,
      isphoto: this.is_PhotoRequired,
      metaupdatedby: this.toServeremployeekey,
      OrganizationID: this.OrganizationID

    };

    // this.workOrderService.addQuickWorkOrder(this.createworkorder).then((data) => {

      
    //    this.EmployeeKey=null;
    //    this.WorkorderNotes=null;
    //    this.FacilityKey=null;
    //    this.PriorityKey=null;
       
              

    //   // this.router.navigateByUrl('WorkOrderView');
    //   this.location.back();
    //   this.PresentAlert();
    // });

  }
  GoBack() {
    // this.router.navigateByUrl('WorkOrderDashBoard');
    this.location.back();
  }
}
