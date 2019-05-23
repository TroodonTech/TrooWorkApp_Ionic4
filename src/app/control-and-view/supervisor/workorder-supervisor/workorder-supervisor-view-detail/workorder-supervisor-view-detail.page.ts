import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkOrderService } from '../../../../service/work-order.service';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import {Location} from '@angular/common';
@Component({
  selector: 'app-workorder-supervisor-view-detail',
  templateUrl: './workorder-supervisor-view-detail.page.html',
  styleUrls: ['./workorder-supervisor-view-detail.page.scss'],
})
export class WorkorderSupervisorViewDetailPage implements OnInit {

  worKey$;
  viewEmpWorkorderDetails;
  profile;
  toServeremployeekey;
  OrganizationID;
  inbarcode;
  today_DT;
  respo_barcodeComp;

  constructor(public workOrderService: WorkOrderService, private route: ActivatedRoute, private router: Router,
    private barcodeScanner: BarcodeScanner,private location: Location) {
     //debugger;
    this.route.params.subscribe(params => this.worKey$ = params.WorkOrderKey);
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

  ngOnInit() {
     // from token employeekey and orgID has been taken.
     var token = localStorage.getItem('token');
    localStorage['token'] = token;
    var encodedProfile = token.split('.')[1];
    this.profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.toServeremployeekey = this.profile.employeekey;
    this.OrganizationID = this.profile.OrganizationID;
    this.today_DT = this.convert_DT(new Date());

   //debugger;
    this.workOrderService.workorderDetails(this.worKey$, this.OrganizationID).subscribe((data: any[]) => {
      this.viewEmpWorkorderDetails = data;
    });
  }
  delayCurrentWorkOrder(workKey) {
    this.workOrderService.delayCurrentWorkOrder(workKey, this.toServeremployeekey, this.OrganizationID).subscribe(() => {
      this.router.navigateByUrl('workorder_Supervisor_View');
    });
  }
  continueCurrentWorkOrder(workKey) {
    this.workOrderService.continueCurrentWorkOrder(workKey, this.toServeremployeekey, this.OrganizationID).subscribe(() => {
      this.router.navigateByUrl('workorder_Supervisor_View');
    });
  }

  scanBarcode(workKey) {
   //debugger;
    this.barcodeScanner.scan().then(data => {
      // this is called when a barcode is found
      this.inbarcode = data.text;
      console.log('bar ' + this.inbarcode);
      // tslint:disable-next-line:max-line-length
      this.workOrderService.barcodeRoom_check(this.inbarcode, workKey, this.OrganizationID)
        .subscribe((data1: any[]) => {
          var type = 'automatic';
          // if (data1 == 1) {
          this.workOrderService.barcodeRoom(this.worKey$, this.inbarcode, type, this.toServeremployeekey, this.OrganizationID)
            .subscribe((data2: any[]) => {
              this.respo_barcodeComp = data2;
              console.log('this.respo_barcodeComp.WorkorderStatus  ' + this.respo_barcodeComp.WorkorderStatus);
              if (this.respo_barcodeComp.WorkorderStatus === 'Completed') {
                console.log('inside complete');
                this.workOrderService.workorderDetails(this.worKey$, this.OrganizationID).subscribe((data4: any[]) => {
                  this.viewEmpWorkorderDetails = data4;
                  for (var i = 0; this.viewEmpWorkorderDetails.WorkorderStatus === 'Completed'; i++) {
                    console.log('inside complete loop');
                    this.workOrderService.workorderDetails(this.worKey$, this.OrganizationID).subscribe((data5: any[]) => {
                      this.viewEmpWorkorderDetails = data5;
                    });
                  }
                });
              } else {
                console.log('inside schedule');
                for (var i = 0; this.viewEmpWorkorderDetails.WorkorderStatus === !'Scheduled'; i++) {
                  console.log('inside inprogress loop');
                  this.workOrderService.workorderDetails(this.worKey$, this.OrganizationID).subscribe((data5: any[]) => {
                    this.viewEmpWorkorderDetails = data5;
                  });
                }

              }
              });
          // }
        });
    }).catch(err => {
      console.log('Error', err);
    });

  }
  workCompleted(work) {
    this.workOrderService.workCompleted(work, this.toServeremployeekey, this.OrganizationID).subscribe(() => {
      this.workOrderService.workorderDetails(this.worKey$, this.OrganizationID).subscribe((data5: any[]) => {
        this.viewEmpWorkorderDetails = data5;
      });
    });
  }
  takePhoto(WorkKey) {
    this.router.navigate(['/file-upload', WorkKey]);
  }
  GoBack() {
   // this.router.navigateByUrl('/workorder_Supervisor_View');
   this.location.back();
  }
}
