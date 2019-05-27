import { Component, OnInit } from '@angular/core';
import { WorkOrderService } from '../../../service/work-order.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-work-order-scan-emp',
  templateUrl: './work-order-scan-emp.page.html',
  styleUrls: ['./work-order-scan-emp.page.scss'],
})
export class WorkOrderScanEmpPage implements OnInit {
  inbarcode;
  toServeremployeekey;
  today_DT;
  OrganizationID;
  imageScan;
  viewworkorder;

 // rootPage:any =TabsEmployeePage;

  constructor(public workOrderService: WorkOrderService,
     private barcodeScanner: BarcodeScanner,private router: Router
     ,private location: Location) { }

  convert_DT(str) { // date convertion function YYYY/MM/DD
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
    return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
  }
  
  ngOnInit() {
    var token = localStorage.getItem('token');
    localStorage['token'] = token;
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.toServeremployeekey=profile.employeekey;
    this.OrganizationID = profile.OrganizationID;
    this.today_DT = this.convert_DT(new Date());
  }

  getEmployeeWorkorderByBarcode() {

    this.barcodeScanner.scan().then(data => {
      // this is called when a barcode is found
      this.inbarcode = data.text;
      console.log('bar ' + this.inbarcode);
      // tslint:disable-next-line:max-line-length
      this.workOrderService.scanforWorkorder(this.inbarcode, this.toServeremployeekey, this.today_DT, this.OrganizationID)
        .subscribe((data1: any[]) => {
          this.viewworkorder = data1;
        });
    }).catch(err => {
      console.log('Error', err);
    });

  }
  GoBack() {
    // this.router.navigateByUrl('EmployeeDashBoard');
    this.location.back();
  }

}
