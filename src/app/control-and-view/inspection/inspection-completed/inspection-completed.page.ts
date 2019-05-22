import { Component, OnInit } from '@angular/core';
import { InspectionServiceService } from '../../../service/inspection-service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
// import { ManagerTabMenuPage  } from '../../menu-tab/manager-tab-menu/manager-tab-menu.page';
import { LoadingController } from '@ionic/angular';
import {Location} from '@angular/common';
@Component({
  selector: 'app-inspection-completed',
  templateUrl: './inspection-completed.page.html',
  styleUrls: ['./inspection-completed.page.scss'],
})
export class InspectionCompletedPage implements OnInit {
  viewinspectionorder;
  
  toServeremployeekey;
  employeekey;
  disableNext;
  templateName;
  managerkey;
  inspKey$;
  inspectionsubmitted;
 // loadInspection;
 // getInspectionDetails;
 inspectKey;
 templID;
 roomtype;
 supervisorName;
 inspectionNotCompleted;
 scoreName;
 roomId;
 inspectionreport;
 inspectedby;
 scoreType;
 values;
 notes;
 OrganizationID;

  constructor(public inspectionServiceService:InspectionServiceService,
    private router: Router,
    private route: ActivatedRoute,
    public loadCtrl: LoadingController,
    private location: Location) 
  {
    this.route.params.subscribe(params => this.inspKey$ = params.insKey);
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

  convert_DT(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  }

  async presentLoadinggetInspectionDetailsService() {
    const loading = await this.loadCtrl.create({
      //spinner: 'hide',
     // duration: 5000,
      message: 'Please wait...',
      translucent: true, 
      cssClass: 'custom-class custom-loading'
    });
   await loading.present();
   this.inspectionServiceService
   .getInspectionDetailsService(this.inspKey$,this.OrganizationID)
    .subscribe((data:any[]) => {

    //debugger; 
    
     
     if(data[0].InspectionCompletedBy === null)
     {
       
       this.inspectionNotCompleted = true;
     }
     else{
       this.inspectionNotCompleted = false;
        this.inspectionsubmitted = data;
       this.roomtype = this.inspectionsubmitted[0].RoomType;
       this.supervisorName = this.inspectionsubmitted[0].SupervisorName;
       this.templateName = this.inspectionsubmitted[0].TemplateName;
       this.scoreName = this.inspectionsubmitted[0].ScoreName;
       this.roomId = this.inspectionsubmitted[0].RoomId;
       this.inspectionreport = "Inspection Report";
       this.inspectedby = "Inspected By: "
       this.scoreType = "Score Name: "
       this.values = "Value: ";
       this.notes ="Notes: ";
     }

   

    loading.dismiss();
});
  
}


  ngOnInit() {

    var token = localStorage.getItem('token');
    localStorage['token'] = token;
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));

    this.toServeremployeekey=profile.employeekey;
    this.OrganizationID = profile.OrganizationID;


    this.employeekey= window.localStorage.getItem("employeekey");

   
    this.presentLoadinggetInspectionDetailsService();
    
          
    
  }

  GoBack() {
    // this.router.navigateByUrl('viewInspection');
    this.location.back();
  }


}
