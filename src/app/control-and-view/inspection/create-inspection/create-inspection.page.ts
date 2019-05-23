import { Component, OnInit } from '@angular/core';
import { InspectionServiceService } from '../../../service/inspection-service.service';
// import 'rxjs/add/operator/filter';

// import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
// import { mobiscroll } from '@mobiscroll/angular';

import {AlertController} from '@ionic/angular';
// import { ManagerTabMenuPage  } from '../../menu-tab/manager-tab-menu/manager-tab-menu.page';
import { LoadingController } from '@ionic/angular';
import {Location} from '@angular/common';

@Component({
  selector: 'app-create-inspection',
  templateUrl: './create-inspection.page.html',
  styleUrls: ['./create-inspection.page.scss'],
})
export class CreateInspectionPage implements OnInit {

//variables used in TS and HTML to bind 
  TemplateID;
  timeValue;
  dateValue;
  SupervisorKey;
  EmployeeKey;
  FacilityKey;
  FloorKey;
  Zone;
  RoomTypeKey;
  RoomKey;
  toServeremployeekey;
  OrganizationID ;
  metaUpdatedBy;

//Temporary variables
  templateName;
  auditor;
  building;
  employee;
  floors;
  zone;
  room;
  rooms;
  Building;
  Floor;

  InspectionOrder;
  templateID;
  templID;
  inspectiontime;
  inspectiondate;
  supervisorKey;
  
  empkey;
  
  facilityKey;
  
  roomList;
  roomKey;
  newInspectKey;
  inspectKey;
  templName;
  
  

  facikey: Number;
  //flrkey:Number;


  


  
 //constructor(public inspectionServiceService:InspectionServiceService,private toastCtrl: ToastController) { }

constructor(public inspectionServiceService:InspectionServiceService,
  private router: Router,
  public alertController: AlertController,
  public loadCtrl: LoadingController,
  private location: Location) { }
  convert_DT(str) {
    var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice( - 2),
            day = ("0" + date.getDate()).slice( - 2);
            return [date.getFullYear(), mnth, day].join("-");
    };

    async presentAlert() { //Function for displaying successful alert
      const alert = await this.alertController.create({
        header: 'Successfully Added!',
        subHeader: '',
        message: '',
        buttons: ['OK']
      });
  
      await alert.present();
    }

    async TempAlert() { //Mandatory field checking for TemplateId
      const alert = await this.alertController.create({
        header: 'Submit failed',
        subHeader: '',
        message: 'Template name is not provided!',
        buttons: ['OK']
      });
  
      await alert.present();
    }

    async AuditorAlert() {
      const alert = await this.alertController.create({
        header: 'Submit failed',
        subHeader: '',
        message: 'Auditor name is not provided!',
        buttons: ['OK']
      });
  
      await alert.present();
    }

    async BuildAlert() {
      const alert = await this.alertController.create({
        header: 'Submit failed',
        subHeader: '',
        message: 'Building is not provided!',
        buttons: ['OK']
      });
  
      await alert.present();
    }

    async FloorAlert() {
      const alert = await this.alertController.create({
        header: 'Submit failed',
        subHeader: '',
        message: 'Floor is not provided!',
        buttons: ['OK']
      });
  
      await alert.present();
    }

    async RoomAlert() {
      const alert = await this.alertController.create({
        header: 'Submit failed',
        subHeader: '',
        message: 'Room has no value!',
        buttons: ['OK']
      });
  
      await alert.present();
    }

    async RoomnotAlert() {
      const alert = await this.alertController.create({
        header: 'Submit failed',
        subHeader: '',
        message: 'Room is not provided!',
        buttons: ['OK']
      });
  
      await alert.present();
    }
    // presentToast() {
    //   let toast = this.toastCtrl.create({
    //     message: 'User was added successfully',
    //     duration: 3000,
    //     position: 'top'
    //   });
    
      // toast.onDidDismiss(() => {
      //   console.log('Dismissed toast');
      // });
    
    //   toast.present();
    //   return false;
    // }
    
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

    async presentLoadingTemplate() {
      const loading = await this.loadCtrl.create({
        // spinner: 'hide',
       // duration: 5000,
        message: 'Please wait...',
        translucent: true, 
        cssClass: 'custom-class custom-loading'
      });
     await loading.present();
     this.inspectionServiceService.getTemplateName(this.toServeremployeekey,this.OrganizationID).subscribe((data:any []) => {
      this.templateName = data;
      loading.dismiss();
  });
    
 }

 async presentLoadingAuditor() //Load Auditor Name into drop downlist
 {
  const loading = await this.loadCtrl.create({
    // spinner: 'hide',
   // duration: 5000,
    message: 'Please wait...',
    translucent: true, 
    cssClass: 'custom-class custom-loading'
  });
 await loading.present();
 this.inspectionServiceService
 .getAuditorName(this.toServeremployeekey,this.OrganizationID)
 .subscribe((data: any  []) => {
  //debugger;
   this.auditor = data;
 
  loading.dismiss();
});

}

async presentLoadingEmployee() //Load Employee Name into drop downlist
{
 const loading = await this.loadCtrl.create({
  //  spinner: 'hide',
  // duration: 5000,
   message: 'Please wait...',
   translucent: true, 
   cssClass: 'custom-class custom-loading'
 });
await loading.present();
this.inspectionServiceService
.getEmployeeName(this.toServeremployeekey,this.OrganizationID)
.subscribe((data:any) => {
 //debugger;
  this.employee = data;
 loading.dismiss();
});

}

async presentLoadingBuilding() //Load Building Name into drop downlist
{
 const loading = await this.loadCtrl.create({
  //  spinner: 'hide',
  // duration: 5000,
   message: 'Please wait...',
   translucent: true, 
   cssClass: 'custom-class custom-loading'
 });
await loading.present();
this.inspectionServiceService
  .getBuildingName(this.toServeremployeekey,this.OrganizationID)
  .subscribe((data: any[]) => {
    // debugger;
    this.building = data;

 loading.dismiss();
});

}

  ngOnInit() {

    this.FacilityKey="";
    this.TemplateID="";
    this.SupervisorKey="";
    this.EmployeeKey="";
    this.FloorKey="";
    this.Zone="";
    this.RoomTypeKey="";
    this.RoomKey="";
    
    var token = localStorage.getItem('token');
    localStorage['token'] = token;
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));

    this.toServeremployeekey=profile.employeekey;
    this.OrganizationID = profile.OrganizationID;
    var Employeekey_manager = this.toServeremployeekey;



    this.dateValue = this.convert_DT(new Date());
    this.timeValue = new Date().getHours() + ':' + new Date().getMinutes();

   
    
    
    this.presentLoadingTemplate();
    this.presentLoadingAuditor();
    this.presentLoadingEmployee();

    this.presentLoadingBuilding();
   


  

  

  this.FacilityKey="";
    this.TemplateID="";
    this.SupervisorKey="";
    this.EmployeeKey="";
    this.FloorKey="";
    this.Zone="";
    this.RoomTypeKey="";
    this.RoomKey="";
  

}

selectFloorfromBuildings(facKey)
{
 //debugger;
    this.facikey=facKey;
    if(this.FacilityKey)
    {
    this.inspectionServiceService
    .getallFloorNames(facKey,this.OrganizationID)
    .subscribe((data: any[]) => {
     //debugger;
      this.floors = data;
      this.FloorKey="";
      this.Zone="";
      this.RoomTypeKey="";
      this.RoomKey="";
    });
  }
  else
  {
    this.FloorKey="";
    this.Zone="";
    this.RoomTypeKey="";
    this.RoomKey="";
  }
  
}

selectZonefromFloor(flkey)
{
  if(this.FloorKey)
  {


  this.inspectionServiceService
    .getallZones(this.facikey,flkey,this.OrganizationID)
    .subscribe((data:any []) => {
      // debugger;
      this.zone = data;
    });

    this.inspectionServiceService
    .getroomTypefromfacility(this.facikey,flkey,this.OrganizationID)
    .subscribe((data:any []) => {
      // debugger;
      this.room = data;
    });

    this.inspectionServiceService
    .getroomfromfacility(this.facikey,flkey,this.OrganizationID)
    .subscribe((data:any []) => {
      // debugger;
      this.rooms = data;
    });
      this.Zone="";
      this.RoomTypeKey="";
      this.RoomKey="";
  }
  else {
    // $ionicLoading.hide();
    this.Zone="";
    this.RoomTypeKey="";
    this.RoomKey="";
    if(this.FacilityKey)
    this.selectFloorfromBuildings(this.FacilityKey);
    return;
   
}
   
}
selectroomtypefromZone(zoneKey,flrkey)
{
  // debugger;
  if(zoneKey)
  {
    if(flrkey)
    {
      this.inspectionServiceService
      .roomtypeByFacility_Floor_zone(this.FacilityKey, flrkey, zoneKey,this.OrganizationID).subscribe((data: any[]) => {
        this.room = data;
      });
      this.inspectionServiceService
      .roomByFacility_Floor_zone(this.FacilityKey,  flrkey, zoneKey,this.OrganizationID).subscribe((data: any[]) => {
        this.rooms = data;
      });

    }
    else
    {
     this.inspectionServiceService.roomtypeByFacility_Zone(this.FacilityKey,zoneKey,this.OrganizationID).subscribe((data: any[]) => {
       this.room = data;

     });
     this.inspectionServiceService.roomByFacility_Zone(this.FacilityKey, zoneKey,this.OrganizationID).subscribe((data: any[]) => {
       this.rooms = data;

     });
   }
   this.RoomTypeKey="";
      this.RoomKey="";

  }
  else{
    this.RoomTypeKey="";
      this.RoomKey="";
  }
  // this.inspectionServiceService
  // .getallRoomTypes(this.FacilityKey,flrkey,zoneKey)
  // .subscribe((data:any []) => {
  // // debugger;
  //   this.room = data;
  // });
}

selectroomfromRoomtype(RoomTypeKey,ZoneKey)
{

 if(RoomTypeKey)
    {

        if(this.FloorKey)
        {
          if(ZoneKey)
          {
            this.inspectionServiceService.roomByFacility_Floor_Zone_RoomType(this.FacilityKey,this.FloorKey,ZoneKey,RoomTypeKey,this.OrganizationID).subscribe((data: any[]) => 
            {
              this.rooms = data;
            });

          }
          else
          {
            this.inspectionServiceService.roomByFacility_Floor_RoomType(this.FacilityKey,this.FloorKey,RoomTypeKey,this.OrganizationID).subscribe((data: any[]) => 
            {
              this.rooms = data;
            });

          }
        }
        else if(ZoneKey)
        {
          this.inspectionServiceService.roomByFacility_Zone_RoomType(this.FacilityKey,ZoneKey,RoomTypeKey,this.OrganizationID).subscribe((data: any[]) => 
          {
            this.rooms = data;
          });
        }
        else
        {
          this.inspectionServiceService.roomByFacility_RoomType(this.FacilityKey,RoomTypeKey,this.OrganizationID).subscribe((data: any[]) => 
          {
            this.rooms = data;
          });

        }
        this.RoomKey="";

    }
    else{
      this.RoomKey="";
    }
  
  // this.inspectionServiceService
  // .getallRooms(this.FacilityKey,this.FloorKey,zonekey,RoomTypeKey)
  // .subscribe((data: any[]) => {
  // // debugger;
  //   this.rooms = data;
  // });


}

 convert_DT_addOneDay(str) {
  var today = new Date(str);
  var z=" 00:00";
    var str1=new Date();
    str1=str.concat(z);
    var yr=str.substring(0,4);
    var mm=str.substring(5,7);
    mm=mm-1;
    var dd=str.substring(8,10);
    var tomorrow = new Date(yr,mm,dd);
    // console.log("Value in str1 console"+str1);
    // console.log("Value in console"+tomorrow);
    //date added here to fix the issue-Earlier Build
   // tomorrow.setDate(today.getDate()+1); //commented in July 2018 Release
   
        // mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        // day = ("0" + (date.getDate()+1)).slice(-2);
return [tomorrow.getFullYear(), tomorrow.getMonth()+1, tomorrow.getDate()].join("-");
}


createInspectionorder()
{
 //debugger;
  if(this.TemplateID)
  {
    this.templateID = this.TemplateID;
    this.templID = this.templateID;
  }
  else
  {
    this.TempAlert();
    return;    
  }
  if(this.timeValue)
  {
    this.inspectiontime = this.timeValue;
  }
  else
  {
    this.timeValue = new Date().getHours() + ':' + new Date().getMinutes();
    // console.log("time"+$scope.timeValue);
    this.inspectiontime = this.timeValue;
  }
  if(this.dateValue)
  {
    this.inspectiondate = this.convert_DT_addOneDay(this.dateValue);
  }
  else
  {
    this.inspectiondate =this.convert_DT_addOneDay(new Date());
  }
  if(this.SupervisorKey)
  {
    this.supervisorKey = this.SupervisorKey;
  }
  else
  {
    this.AuditorAlert();
    return;
  }

this.metaUpdatedBy = this.toServeremployeekey;
if(this.EmployeeKey){
  this.empkey = this.EmployeeKey;
}
else
{
  this.empkey = -1;
} 
if(this.FacilityKey){
  this.facilityKey = this.FacilityKey;
}
else{
  this.facilityKey = null;
 this.BuildAlert();
  return;
}

if(!this.FloorKey)
{
               
           
 this.FloorAlert();
  return;
}

var roomlistObj = [];
var roomlist = [];
            // debugger;
 roomlistObj = this.rooms;
 var roomString;
  if(this.RoomKey)
  {
    roomString = this.RoomKey;
  }
   else
   {
      if(roomlistObj)
      {
          for(var j = 0; j<roomlistObj.length; j++)
          {
                 roomlist.push(roomlistObj[j].RoomKey);
          }
                roomString = roomlist.join(',');
       }
       else{
       this.RoomAlert();
        return;
    }
  }
  this.RoomKey = roomString;
  if(roomlistObj.length === 0 ){
    this.RoomnotAlert();
      return;
  }






  var t=new Date();
  var t=new Date();
  var y=t.getFullYear();
  var m=t.getMonth();
  var d=t.getDate();
  var h=t.getHours();
  var mi=t.getMinutes();
  var s=t.getSeconds();
  
       var today_DT = this.convert_DT(new Date());
                  
  //var x=new Date(t.getFullYear(),t.getMonth(),t.getDate()).join(-);
  //console.log(x);
  //console.log(y+"-"+m+"-"+d+" "+h+":"+mi+":"+s);
  var p="";
  p=today_DT+" "+h+":"+mi+":"+s;


  this.metaUpdatedBy = this.toServeremployeekey;
  this.OrganizationID = this.OrganizationID;

  this.InspectionOrder={

    templateID:this.TemplateID,
    supervisorKey:this.SupervisorKey,
    inspectiondate:today_DT,
    isRecurring:0,
    inspectiontime:'07:12',
    roomKey:this.RoomKey,
    metaUpdatedBy:this.toServeremployeekey,
    empkey:this.EmployeeKey,
    fulltime:p,
    OrganizationID:this.OrganizationID


  };
 // debugger;
  this.inspectionServiceService
  .createInspectionOrder(this.InspectionOrder).then((data) =>
   {

    this.newInspectKey=data[0].InspectionOrderKey;

    if(this.newInspectKey){
      this.inspectKey = this.newInspectKey;
     this.templID = this.templateID;
      this.templName = this.TemplateID.TemplateName;
      // console.log("inspectkey "+$rootScope.inspectKey+" tempID "+$rootScope.templID+" tempName "+$rootScope.templName);
      var auditorKey = this.supervisorKey;
      // console.log(auditorKey == Employeekey_manager);
          if(auditorKey ==this.toServeremployeekey)
          {
            // this.router.navigate(['/viewDetails', this.inspectKey]);
            this.location.back();
            // Menu/(menucontent:WorkOrderDashBoard)
            // this.router.navigate(['/ManagerDashBoard', { outlets: { menucontent: ['InspectionDashboard' ]}}]);
          }
          else{
             
            // this.router.navigateByUrl('InspectionDashboard');
            this.location.back();
            this.presentAlert();
          }  
  
  this.timeValue = null;
  var workorderkeyString = null;
  
  this.SupervisorKey = null;
  this.TemplateID = null;
  this.EmployeeKey = null;
 this.FacilityKey = null;
  }             
   });
  // $scope.newInspectKey=res[0].InspectionOrderKey;
    //this.presentToast();
    // this.toast.show(`Inspection  created successfully`, '5000', 'center').subscribe(
    //   toast => {
    //     console.log(toast);
    //   }
    // );

   


   

}

  GoBack() {
    // this.router.navigateByUrl('InspectionDashboard');
    this.location.back();
    // this.router.navigate(['/ManagerDashBoardPage',{outlets:{menucontent:['InspectionDashboard']}}]);
    // this.router.navigateByUrl('Menu/(menucontent:InspectionDashboard)');
  }

}
