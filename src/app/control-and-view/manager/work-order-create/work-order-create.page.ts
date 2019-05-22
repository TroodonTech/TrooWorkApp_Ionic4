import { Component, OnInit } from '@angular/core';
import { WorkOrderService } from '../../../service/work-order.service';
//import { Workorder } from '../../model/WorkOrder';
import { Router } from '@angular/router';
import {AlertController} from '@ionic/angular';
import {Location} from '@angular/common';
@Component({
  selector: 'app-work-order-create',
  templateUrl: './work-order-create.page.html',
  styleUrls: ['./work-order-create.page.scss'],
})
export class WorkOrderCreatePage implements OnInit {
  workOrdertypeList;
  facilityList;
  floorList;
  equipmentTypeList;
  equipmentList;
  zoneList;
  roomtypeList;
  roomList;
  priorityList;
  employeeList;
  FacilityKey;
  FloorKey;
  ZoneKey;
  RoomTypeKey;
  RoomKey;
  EquipmentTypeKey;
  EquipmentKey;
  PriorityKey;
  EmployeeKey;
  timeValue: any;
  dateValue: any;
  isPhotoRequired: any;
  isBarcodeRequired: any;
  showEqTypes: any;
  WorkorderTypeKey;
  workorderNotes;
  toServeremployeekey;
  OrganizationID;

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

  workorderCreation;


  //

  constructor(public workOrderService: WorkOrderService, 
    private router: Router,
    public alertController: AlertController,
    private location: Location) { }
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


  selectedFacility() { // to get floor by facility

   //debugger;
   if(this.FacilityKey)
   {

  
    this.workOrderService.getFloor(this.FacilityKey,this.OrganizationID).subscribe((data: any[]) => {
      this.floorList = data;
      this.FloorKey="";
    this.ZoneKey="";
    this.RoomTypeKey="";
    this.RoomKey="";


    });
  }
  else{
    this.FloorKey="";
    this.ZoneKey="";
    this.RoomTypeKey="";
    this.RoomKey="";
  }
  }
  changedFloor() {// drop down values when floor value has been selected
    if(this.FloorKey)
    {

    
    this.workOrderService.getEquipmentBuildFloor(this.FacilityKey, this.FloorKey,this.OrganizationID).subscribe((data: any[]) => {
      this.equipmentTypeList = data;
      this.equipmentList = data;

    });
    this.workOrderService.zoneByFacility_Floor(this.FacilityKey, this.FloorKey,this.OrganizationID).subscribe((data: any[]) => {
      this.zoneList = data;

    });
    this.workOrderService.roomtypeByFacility_Floor(this.FacilityKey, this.FloorKey,this.OrganizationID).subscribe((data: any[]) => {
      this.roomtypeList = data;

    });
    this.workOrderService.roomByFacility_Floor(this.FacilityKey, this.FloorKey,this.OrganizationID).subscribe((data: any[]) => {
      this.roomList = data;

    });
    this.ZoneKey="";
    this.RoomTypeKey="";
    this.RoomKey="";
  }
  else{
    this.ZoneKey="";
    this.RoomTypeKey="";
    this.RoomKey="";
  }
  }
  changedZone() {// drop down values when zone value has been selected
    if (this.ZoneKey) 
    {
      if(this.FloorKey)
      {
      this.workOrderService.roomtypeByFacility_Floor_zone(this.FacilityKey, this.FloorKey, this.ZoneKey,this.OrganizationID).subscribe((data: any[]) => {
        this.roomtypeList = data;

      });
      this.workOrderService.roomByFacility_Floor_zone(this.FacilityKey, this.FloorKey, this.ZoneKey,this.OrganizationID).subscribe((data: any[]) => {
        this.roomList = data;

      });

      } 
    else
     {
      this.workOrderService.roomtypeByFacility_Zone(this.FacilityKey,this.ZoneKey,this.OrganizationID).subscribe((data: any[]) => {
        this.roomtypeList = data;

      });
      this.workOrderService.roomByFacility_Zone(this.FacilityKey, this.ZoneKey,this.OrganizationID).subscribe((data: any[]) => {
        this.roomList = data;

      });
    }
    this.RoomTypeKey="";
    this.RoomKey="";
  }
  else
  {
    this.RoomTypeKey="";
    this.RoomKey="";
  }
  }
  changedRoomtype()
  {
    if(this.RoomTypeKey)
    {

        if(this.FloorKey)
        {
          if(this.ZoneKey)
          {
            this.workOrderService.roomByFacility_Floor_Zone_RoomType(this.FacilityKey,this.FloorKey,this.ZoneKey,this.RoomTypeKey,this.OrganizationID).subscribe((data: any[]) => 
            {
              this.roomList = data;
            });

          }
          else
          {
            this.workOrderService.roomByFacility_Floor_RoomType(this.FacilityKey,this.FloorKey,this.RoomTypeKey,this.OrganizationID).subscribe((data: any[]) => 
            {
              this.roomList = data;
            });

          }
        }
        else if(this.ZoneKey)
        {
          this.workOrderService.roomByFacility_Zone_RoomType(this.FacilityKey,this.ZoneKey,this.RoomTypeKey,this.OrganizationID).subscribe((data: any[]) => 
          {
            this.roomList = data;
          });
        }
        else
        {
          this.workOrderService.roomByFacility_RoomType(this.FacilityKey,this.RoomTypeKey,this.OrganizationID).subscribe((data: any[]) => 
          {
            this.roomList = data;
          });

        }
        this.RoomKey="";

    }
    else
    {
      this.RoomKey="";
    }
  }

  selectDomainEquipmenttype()
  {
    this.workOrderService.getEquipmentEquTypeChange(this.FacilityKey, this.FloorKey,this.EquipmentTypeKey,this.OrganizationID).subscribe((data: any[]) => {
      this.equipmentTypeList = data;
    });
  }

  createWorkorder() { // checking equipment workorder or not
    if (this.showEqTypes === false) {
      this.createWorkorder1();
      console.log('Equipment***Not');

    } else {
      console.log('Equipment***');
      this.createWorkorder2();

    }
  }
  async WorkOrderTypeAlert() {
    const alert = await this.alertController.create({
      header: 'Workorder Creation',
      subHeader: '',
      message: 'Workorder Type is not provided!',
      buttons: ['OK']
    });

    await alert.present();
  }

  async FacilityAlert() {
    const alert = await this.alertController.create({
      header: 'Workorder Creation',
      subHeader: '',
      message: 'Building  is not provided!',
      buttons: ['OK']
    });

    await alert.present();
  }

  async FloorAlert() {
    const alert = await this.alertController.create({
      header: 'Workorder Creation',
      subHeader: '',
      message: 'Floor  is not provided!',
      buttons: ['OK']
    });

    await alert.present();
  }

  async RoomAlert() {
    const alert = await this.alertController.create({
      header: 'Workorder Creation',
      subHeader: '',
      message: 'Room has no value!',
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
  
  createWorkorder1() {// workorder create without equipment

   //debugger;

    var roomlistObj = [];

    var roomtypelistObj = [];

    var zonelistObj = [];

    var floorlistObj = [];

    var facilitylistObj = [];



    var facilityList = [];

    var roomList = [];

    var roomtypeList = [];

    var zoneList = [];

    var floorList = [];

    facilitylistObj = this.facilityList;
    facilityList = [];
    roomList = [];
    roomtypeList = [];
    zoneList = [];
    floorList = [];

    floorlistObj = this.floorList;
    zonelistObj = this.zoneList;
    roomtypelistObj = this.roomtypeList;
    roomlistObj = this.roomList;

    this.intervaltype = '0'; // char(1),/*d for day, w for week, m for month*/
    this.repeatinterval = 1; // int,/*daily(every `2` days) weekly(every `1` week) monthly(every `3` months)*/
    this.occurenceinstance = null; // int,/*daily(3) weekly(null) monthly(null) monthly(1)*/
    this.occursonday = null;
    if (this.WorkorderTypeKey)
     {
      this.wot = this.WorkorderTypeKey;
     } 
     else
     {
      this.wot = null;
      this.WorkOrderTypeAlert();
      return;

    }
    
    if (this.workorderNotes) {
      this.notes = this.workorderNotes;
    } else {
      this.notes = null;
    }
    
    if (!this.FacilityKey)
     {
       this.FacilityAlert();
       return;

    }

    if (!this.FloorKey)
     {
        this.FloorAlert();
        return;

    }
// if values are not selected drop down values are selected for facility,floor,zone,roomtype,floortype,room.
    var roomsString;
    if (this.RoomKey) {
      roomsString = this.RoomKey;
    } else {
      if (roomlistObj) {

        for (var j = 0; j < roomlistObj.length; j++) {
          roomList.push(roomlistObj[j].RoomKey);
        }
        roomsString = roomList.join(',');
      } else {
                this.RoomAlert();
        return;
      }
    }


    var facilityString;
    if (this.FacilityKey) {
      facilityString = this.FacilityKey;
    } else {
      if (facilitylistObj) {

        for (var j = 0; j < facilitylistObj.length; j++) {
          facilityList.push(facilitylistObj[j].FacilityKey);
        }
        facilityString = facilityList.join(',');
      }
    }

    var floorString;
    if (this.FloorKey) {
      floorString = this.FloorKey;
    } else {
      if (floorlistObj) {

        for (var j = 0; j < floorlistObj.length; j++) {
          floorList.push(floorlistObj[j].FloorKey);
        }
        floorString = floorList.join(',');
      }
    }

    var zoneString;
    if (this.ZoneKey) {
      zoneString = this.ZoneKey;
    } else {
      this.zone = null;
      if (zonelistObj) {

        for (var j = 0; j < zonelistObj.length; j++) {
          zoneList.push(zonelistObj[j].ZoneKey);
        }
        zoneString = zoneList.join(',');
      }
    }

    var roomtypeString;
    if (this.RoomTypeKey) {
      roomtypeString = this.RoomTypeKey;
    } else {
      if (roomtypelistObj) {

        for (var j = 0; j < roomtypelistObj.length; j++) {
          roomtypeList.push(roomtypelistObj[j].RoomTypeKey);
        }
        roomtypeString = roomtypeList.join(',');
      }
    }
    if (this.EquipmentKey) {
      this.eqp_key = this.EquipmentKey;
    } else {
      this.eqp_key = - 1;
    }

    //        alert("equip key " + eqp_key);

    if (this.EmployeeKey) {
      this.emp_key = this.EmployeeKey;
    } else {
      this.emp_key = - 1;
    }
    if (this.ZoneKey) {
      this.zone = this.ZoneKey;
    } else {
      this.zone = null;

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
    if (this.isBarcodeRequired) {
      this.is_BarcodeRequired = 1;
    } else {
      this.is_BarcodeRequired = 0;
    }


    this.isReccuring = false;
    this.isrecurring = 0;

    if (this.dateValue) {
      // alert("startdate vale" + $scope.dateValue);
      this.startDT = this.dateValue;
      //  convert_DT($scope.dateValue);
    } else {

      //  this.startDT = this.dateValue;
      this.startDT = this.convert_DT(new Date());
      //                  $scope.newworkorderError = "Start date is not provided !";
      //                   $scope.clickToOpen("Start date is not provided !");
      //                   return;
    }
    this.endDT = this.startDT;
    if (this.timeValue) {
      this.workTime = this.timeValue;
      //                    console.log("workorder time orig  " + workTime);
      //                    console.log("workorder time parsed  " + workTime);
    } else {
      this.timeValue = new Date().getHours() + ':' + new Date().getMinutes();
      this.workTime = '12:12:00';

    }
    // values are set into object to create workorder
    this.workorderCreation = {
      occursontime: this.workTime,
      workorderkey: - 99,
      workordertypekey: this.wot,
      workordernote: this.notes,
      equipmentkey: this.eqp_key,
      roomkeys: roomsString,
      facilitykeys: facilityString,
      floorkeys: floorString,
      zonekeys: zoneString,
      roomtypekeys: roomtypeString,
      employeekey: this.emp_key,
      priority: this.priority,
      fromdate: this.startDT,
      todate: this.endDT,
      isbar: this.is_BarcodeRequired,
      isphoto: this.is_PhotoRequired,
      metaupdatedby: this.toServeremployeekey,
      OrganizationID: this.OrganizationID,
      intervaltype: '0', // char(1),/*d for day, w for week, m for month*/
      repeatinterval: 1,
      occursonday: null
    };
    // this.workOrderService.addWorkOrderWithOutEqup(this.workorderCreation).then((data) => {
      
    //   this.WorkorderTypeKey=null;
    //   this.workorderNotes=null;
    //   this.FacilityKey=null;
    //   this.FloorKey=null;
    //   this.ZoneKey=null;
    //   this.RoomTypeKey=null;
    //   this.RoomKey=null;
    //   this.showEqTypes=null;
    //   this.EquipmentTypeKey=null;
    //   this.EquipmentKey=null;
    //   this.PriorityKey=null;
    //   this.EmployeeKey=null;

      


    //   // this.router.navigateByUrl('WorkOrderView');
    //   // this.router.navigate(['WorkOrderView']);
    //   this.location.back();
      
    //   this.PresentAlert();
    // });
  }
  createWorkorder2() {// create workorder with equipment

   //debugger;

    var roomlistObj = [];

    var roomtypelistObj = [];

    var zonelistObj = [];

    var floorlistObj = [];

    var facilitylistObj = [];


    var EquListObj = [];



    var facilityList = [];

    var roomList = [];

    var roomtypeList = [];

    var zoneList = [];

    var floorList = [];

    var equList = [];
    facilitylistObj = this.facilityList;
    facilityList = [];
    roomList = [];
    roomtypeList = [];
    zoneList = [];
    floorList = [];
    equList = [];
    floorlistObj = this.floorList;
    zonelistObj = this.zoneList;
    roomtypelistObj = this.roomtypeList;
    roomlistObj = this.roomList;
    EquListObj = this.equipmentList;

    this.intervaltype = '0'; // char(1),/*d for day, w for week, m for month*/
    this.repeatinterval = 1; // int,/*daily(every `2` days) weekly(every `1` week) monthly(every `3` months)*/
    this.occurenceinstance = null; // int,/*daily(3) weekly(null) monthly(null) monthly(1)*/
    this.occursonday = null;

    if (this.WorkorderTypeKey) {
      this.wot = this.WorkorderTypeKey;
    } 
    else
     {
      this.wot = null;
      this.WorkOrderTypeAlert();
      return;

    }
    
    if (this.workorderNotes) {
      this.notes = this.workorderNotes;
    } else {
      this.notes = null;
    }
    if (!this.FacilityKey)
    {
      this.FacilityAlert();
      return;

   }
   if (!this.FloorKey)
     {
        this.FloorAlert();
        return;

    }

    var roomsString;
    roomsString = -1;
  

// if values are not selected drop down values are selected for facility,floor,zone,roomtype,floortype,room.
    var facilityString;
    if (this.FacilityKey) {
      facilityString = this.FacilityKey;
    } else {
      if (facilitylistObj) {

        for (var j = 0; j < facilitylistObj.length; j++) {
          facilityList.push(facilitylistObj[j].FacilityKey);
        }
        facilityString = facilityList.join(',');
      }
    }

    var floorString;
    if (this.FloorKey) {
      floorString = this.FloorKey;
    } else {
      if (floorlistObj) {

        for (var j = 0; j < floorlistObj.length; j++) {
          floorList.push(floorlistObj[j].FloorKey);
        }
        floorString = floorList.join(',');
      }
    }

    var zoneString;
    if (this.ZoneKey) {
      zoneString = this.ZoneKey;
    } else {
      this.zone = null;
      if (zonelistObj) {

        for (var j = 0; j < zonelistObj.length; j++) {
          zoneList.push(zonelistObj[j].ZoneKey);
        }
        zoneString = zoneList.join(',');
      }
    }

    var roomtypeString;
    if (this.RoomTypeKey) {
      roomtypeString = this.RoomTypeKey;
    } else {
      if (roomtypelistObj) {

        for (var j = 0; j < roomtypelistObj.length; j++) {
          roomtypeList.push(roomtypelistObj[j].RoomTypeKey);
        }
        roomtypeString = roomtypeList.join(',');
      }
    }
    if (this.EquipmentKey) {
      this.eqp_key = this.EquipmentKey;
    } else {
      this.eqp_key = - 1;
    }
    if (this.EquipmentKey) {
      this.eqp_key = this.EquipmentKey;
    } else {

      if (EquListObj) {

        for (var j = 0; j < EquListObj.length; j++) {
          equList.push(EquListObj[j].EquipmentKey);
        }
        this.eqp_key = equList.join(',');
      }

    }

    //        alert("equip key " + eqp_key);

    if (this.EmployeeKey) {
      this.emp_key = this.EmployeeKey;
    } else {
      this.emp_key = - 1;
    }
    if (this.ZoneKey) {
      this.zone = this.ZoneKey;
    } else {
      this.zone = null;

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
    if (this.isBarcodeRequired) {
      this.is_BarcodeRequired = 1;
    } else {
      this.is_BarcodeRequired = 0;
    }


    this.isReccuring = false;
    this.isrecurring = 0;

    if (this.dateValue) {
      // alert("startdate vale" + $scope.dateValue);
      this.startDT = this.dateValue;
      //  convert_DT($scope.dateValue);
    } else {

      //  this.startDT = this.dateValue;
      this.startDT = this.convert_DT(new Date());
      //                  $scope.newworkorderError = "Start date is not provided !";
      //                   $scope.clickToOpen("Start date is not provided !");
      //                   return;
    }
    this.endDT = this.startDT;
    if (this.timeValue) {
      this.workTime = this.timeValue;
      //                    console.log("workorder time orig  " + workTime);
      //                    console.log("workorder time parsed  " + workTime);
    } else {
      this.timeValue = new Date().getHours() + ':' + new Date().getMinutes();
      this.workTime = '12:12:00';

    }
    // values are set into object to create workorder
    this.workorderCreation = {
      occursontime: this.workTime,
      workorderkey: - 99,
      workordertypekey: this.wot,
      workordernote: this.notes,
      equipmentkey: this.eqp_key,
      roomkeys: roomsString,
      facilitykeys: facilityString,
      floorkeys: floorString,
      zonekeys: zoneString,
      roomtypekeys: roomtypeString,
      employeekey: this.emp_key,
      priority: this.priority,
      fromdate: this.startDT,
      todate: this.endDT,
      isbar: this.is_BarcodeRequired,
      isphoto: this.is_PhotoRequired,
      metaupdatedby: this.toServeremployeekey,
      OrganizationID: this.OrganizationID,
      intervaltype: '0', // char(1),/*d for day, w for week, m for month*/
      repeatinterval: 1,
      occursonday: null
    };
    // this.workOrderService.addWorkOrderEqup(this.workorderCreation).then((data) => {
    //   this.WorkorderTypeKey=null;
    //   this.workorderNotes=null;
    //   this.FacilityKey=null;
    //   this.FloorKey=null;
    //   this.ZoneKey=null;
    //   this.RoomTypeKey=null;
    //   this.RoomKey=null;
    //   this.showEqTypes=null;
    //   this.EquipmentTypeKey=null;
    //   this.EquipmentKey=null;
    //   this.PriorityKey=null;
    //   this.EmployeeKey=null;
    //   this.PresentAlert();
    //   // this.router.navigateByUrl('WorkOrderView');
    //   // this.router.navigate(['WorkOrderView']);
    //   this.location.back();
     
    // });

  }





  ngOnInit() {

    // debugger;
    console.log('inside oninit');
    // from token employeekey and orgID has been taken.
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

    this.WorkorderTypeKey="";
    this.FacilityKey="";
    this.FloorKey="";
    this.ZoneKey="";
    this.RoomTypeKey="";
    this.RoomKey="";
    this.EquipmentTypeKey="";
    this.EquipmentKey="";
    this.PriorityKey="";
    this.EmployeeKey="";

    this.showEqTypes = false;
    this.dateValue = this.convert_DT(new Date());
    this.timeValue = new Date().getHours() + ':' + new Date().getMinutes();
    this.workOrderService.GetWorkorderType(this.toServeremployeekey,this.OrganizationID).subscribe((data: any[]) => {
      this.workOrdertypeList = data;

    });
    this.workOrderService.getBuilding(this.toServeremployeekey,this.OrganizationID).subscribe((data: any[]) => {
      this.facilityList = data;

    });
    this.workOrderService.priorityList(this.OrganizationID).subscribe((data: any[]) => {
      this.priorityList = data;

    });
    this.workOrderService.allemployees(this.toServeremployeekey,this.OrganizationID).subscribe((data: any[]) => {
      this.employeeList = data;

    });
  }
  GoBack() {// go back option
    // this.router.navigateByUrl('WorkOrderDashBoard');
    this.location.back();
  }


}
