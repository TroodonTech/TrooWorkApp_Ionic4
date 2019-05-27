import { Component, OnInit } from '@angular/core';
import { WorkOrderService } from '../../../service/work-order.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import {Location} from '@angular/common';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-work-order-complete',
  templateUrl: './work-order-complete.page.html',
  styleUrls: ['./work-order-complete.page.scss'],
})
export class WorkOrderCompletePage implements OnInit {
  worKey$;
  viewEmpWorkorderDetails;
  profile;
  toServeremployeekey;
  OrganizationID;
  inbarcode;
  today_DT;
  respo_barcodeComp;


  constructor(public workOrderService: WorkOrderService, 
    private route: ActivatedRoute, private router: Router,
    private barcodeScanner: BarcodeScanner,
    private location: Location,
    private geolocation: Geolocation) {
    this.route.params.subscribe(params => this.worKey$ = params.WorkOrderKey);
  }

  convert_DT(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
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
  ionViewWillEnter(){
    this.workOrderService.workorderDetails(this.worKey$, this.OrganizationID).subscribe((data: any[]) => {
      this.viewEmpWorkorderDetails = data;
    });
  }
  ngOnInit() {
    var token = localStorage.getItem('token');
    localStorage['token'] = token;
    var encodedProfile = token.split('.')[1];
    this.profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.toServeremployeekey = this.profile.employeekey;
    this.OrganizationID = this.profile.OrganizationID;
    this.today_DT = this.convert_DT(new Date());
    this.ionViewWillEnter();
  }
  delayCurrentWorkOrder(workKey) {
    this.workOrderService.delayCurrentWorkOrder(workKey, this.toServeremployeekey, this.OrganizationID).subscribe(() => {
      this.router.navigateByUrl('workorder-view');
    });
  }
  continueCurrentWorkOrder(workKey) {
    this.workOrderService.continueCurrentWorkOrder(workKey, this.toServeremployeekey, this.OrganizationID).subscribe(() => {
      this.router.navigateByUrl('workorder-view');
    });
  }

  scanBarcode(workKey) {
   //debugger;
   var t=new Date();
    var y=t.getFullYear();
    var m=t.getMonth();
    var d=t.getDate();
    var h=t.getHours();
    var mi=t.getMinutes();
    var s=t.getSeconds();

     var today_DT = this.convert_DT(new Date());
     var p="";
      p= today_DT+" "+h+":"+mi+":"+s;
    this.barcodeScanner.scan().then(data => {
      // this is called when a barcode is found
      this.inbarcode = data.text;
      console.log('bar ' + this.inbarcode);
      // tslint:disable-next-line:max-line-length
      this.workOrderService.barcodeRoom_check(this.inbarcode, workKey, this.OrganizationID)
        .subscribe((data1) => {
          var type = 'automatic';
          if (data1 == 1) {
          this.workOrderService.barcodeRoom(this.worKey$, this.inbarcode, type, this.toServeremployeekey, this.OrganizationID,p)
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
          }else{
            alert("Scan the correct barcode!")
          }
        });
    }).catch(err => {
      console.log('Error', err);
    });

  }
  workCompleted(work) {
    var t=new Date();
    var y=t.getFullYear();
    var m=t.getMonth();
    var d=t.getDate();
    var h=t.getHours();
    var mi=t.getMinutes();
    var s=t.getSeconds();

     var today_DT = this.convert_DT(new Date());
     var p="";
      p= today_DT+" "+h+":"+mi+":"+s;

    this.workOrderService.workCompleted(work, this.toServeremployeekey, this.OrganizationID,p).subscribe(() => {
      this.workOrderService.workorderDetails(this.worKey$, this.OrganizationID).subscribe((data5: any[]) => {
        this.viewEmpWorkorderDetails = data5;
      });
    });
  }
  takePhoto(WorkKey) {
    this.router.navigate(['/file-upload', WorkKey]);
  }

  locationTracker(WorkorderKey){

    var t=new Date();
    var y=t.getFullYear();
    var m=t.getMonth();
    var d=t.getDate();
    var h=t.getHours();
    var mi=t.getMinutes();
    var s=t.getSeconds();

     var today_DT = this.convert_DT(new Date());
     var p="";
      p= today_DT+" "+h+":"+mi+":"+s;
      
    this.geolocation.getCurrentPosition().then((resp) => {
       
       resp.coords.longitude
        console.log("lant "+resp.coords.latitude+" long "+resp.coords.longitude);
      let backgroundlocation={
        geolatitude : resp.coords.latitude,
        geolongitude : resp.coords.longitude,
        EmployeeKey : this.toServeremployeekey,
        WorkOrderKey : WorkorderKey,
        systime:p,
        OrganizationID:this.OrganizationID
      }
      this.workOrderService.gpsSnapShot(backgroundlocation).then((data) => {
        this.workOrderService.workorderDetails(this.worKey$, this.OrganizationID).subscribe((data4: any[]) => {
          this.viewEmpWorkorderDetails = data4;
          
        });
      });
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  GoBack() {
    //this.router.navigateByUrl('/workorder-view');
     this.location.back();
  }
}
