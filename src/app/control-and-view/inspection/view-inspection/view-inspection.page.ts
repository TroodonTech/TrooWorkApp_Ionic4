import { Component, OnInit } from '@angular/core';
import { InspectionServiceService } from '../../../service/inspection-service.service';
import { Router } from '@angular/router';
// import { ManagerTabMenuPage  } from '../../menu-tab/manager-tab-menu/manager-tab-menu.page';
import { LoadingController } from '@ionic/angular';
import {Location} from '@angular/common';

@Component({
  selector: 'app-view-inspection',
  templateUrl: './view-inspection.page.html',
  styleUrls: ['./view-inspection.page.scss'],
})
export class ViewInspectionPage implements OnInit {

  viewinspectionorder;
  inspectioncompletedby;
  toServeremployeekey;
  employeekey;
  disableNext;
  templName;
  managerkey;
  temp_empKey;
 // loadInspection;
 // getInspectionDetails;
 inspectKey;
 templID;
 OrganizationID;
 loading;
 rel_count;
// InspectionCompletedBy;
  constructor(public inspectionServiceService:InspectionServiceService,
    private router: Router,
     public loadCtrl: LoadingController,
     private location: Location) { }


 
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

 

       

      ngOnInit() {

   // this.loading = true;// loading
  //debugger;
//  window.location.reload();
this.rel_count=0;
// if(this.rel_count==0)
// {
//   window.location.reload();
//   this.rel_count++;
//   return;
// }
if( window.localStorage )
{
  if( !localStorage.getItem( 'firstLoad' ) )
  {
    localStorage[ 'firstLoad' ] = true;
    window.location.reload();
  }  

  else
    localStorage.removeItem( 'firstLoad' );
}
    var token = localStorage.getItem('token');
    localStorage['token'] = token;
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));

    this.toServeremployeekey=profile.employeekey;
    this.temp_empKey=parseInt(this.toServeremployeekey);
    this.OrganizationID = profile.OrganizationID;

    this.employeekey= window.localStorage.getItem("employeekey");

   
    this.presentLoadingWithView();
         
   

       this.rel_count++;

    }
    async presentLoadingWithView() {
      const loading = await this.loadCtrl.create({
        //spinner: 'hide',
       // duration: 5000,
        message: 'Please wait...',
        translucent: true, 
        cssClass: 'custom-class custom-loading'
      });
     await loading.present();
      this.inspectionServiceService.viewDashboardInspectionorder(this.convert_DT(new Date()), this.toServeremployeekey,this.OrganizationID ).subscribe((data: any[]) => {
     
        
        this.viewinspectionorder = data;
        this.inspectioncompletedby=this.viewinspectionorder.InspectionCompletedBy;
        this.disableNext = false;    
       
       loading.dismiss();

  });
    }

    inspectionDetailsByManager(data)
    {
     //debugger;
      this.managerkey=data.EmployeeKey;
      this.toServeremployeekey= parseInt(this.toServeremployeekey);

      if(this.managerkey === this.toServeremployeekey && data.InspectionCompletedBy === null)
      { //not completed manager inspection
       
        this.inspectKey = data.InspectionOrderKey;
        this.templID = data.TemplateId;
        this.templName = data.TemplateName;
        this.router.navigate(['/view-details-inspection',data.InspectionOrderKey]);
        // this.router.navigate(['/Menu', { outlets: { menucontent: ['viewDetails',data.InspectionOrderKey] } }]);
       
    }
    else if(data.InspectionCompletedBy !== null)
    { //completed inspection
      console.log("completed inspection");
      // $state.go('managerDashboard.afterInspectionManagerView',{inspectionorderkey: data.InspectionOrderKey});
      this.router.navigate(['/inspection-completed', data.InspectionOrderKey]);
      
    }

    }

    GoBack() {
      // this.router.navigateByUrl('InspectionDashboard');
      this.location.back();
     // window.location.reload();
     // this.doRefresh(event);
    }
 
}
