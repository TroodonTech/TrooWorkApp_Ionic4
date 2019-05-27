import { Component, OnInit } from '@angular/core';
import { InspectionServiceService } from '../../../../service/inspection-service.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Location } from '@angular/common';
@Component({
  selector: 'app-inspection-supervisor-view',
  templateUrl: './inspection-supervisor-view.page.html',
  styleUrls: ['./inspection-supervisor-view.page.scss'],
})
export class InspectionSupervisorViewPage implements OnInit {
  viewinspectionorder;
  inspectioncompletedby;
  toServeremployeekey;
  employeekey;
  disableNext;
  templName;
  // loadInspection;
  // getInspectionDetails;
  inspectKey;
  templID;
  managerkey;
  OrganizationID;
  //loading;
  constructor(public inspectionServiceService: InspectionServiceService,
    private router: Router, private location: Location,
    public loadCtrl: LoadingController) { }

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
  async presentLoadingWithOptions() {
    const loading = await this.loadCtrl.create({
      /// spinner: 'hide',
      // duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();
    this.inspectionServiceService.viewDashboardInspectionorder(this.convert_DT(new Date()), this.toServeremployeekey, this.OrganizationID).subscribe((data: any[]) => {



      this.viewinspectionorder = data;
      this.inspectioncompletedby = this.viewinspectionorder.InspectionCompletedBy;
      this.disableNext = false;

      loading.dismiss();


    });
  }




  ngOnInit() {
    // this.loading=true;
    var token = localStorage.getItem('token');
    localStorage['token'] = token;
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));

    this.toServeremployeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;

    this.employeekey = window.localStorage.getItem("employeekey");






    this.presentLoadingWithOptions();





  }

  inspectionDetailsByManager(data) {
    //debugger;
    this.managerkey = data.EmployeeKey;
    this.toServeremployeekey = parseInt(this.toServeremployeekey);

    if (this.managerkey === this.toServeremployeekey && data.InspectionCompletedBy === null) { //not completed manager inspection

      this.inspectKey = data.InspectionOrderKey;
      this.templID = data.TemplateId;
      this.templName = data.TemplateName;
      this.router.navigate(['supervisor-menu/inspection-supervisor-view-detail', this.inspectKey]);

    }
    else if (data.InspectionCompletedBy !== null) { //completed inspection
      console.log("completed inspection");
      // $state.go('managerDashboard.afterInspectionManagerView',{inspectionorderkey: data.InspectionOrderKey});
      this.router.navigate(['supervisor-menu/inspection-supervisor-inspection-completed', data.InspectionOrderKey]);
    }

  }


  GoBack() {
    //this.router.navigateByUrl('SuperVisorDashBoard');
    this.location.back();
  }



}
