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
  toServeremployeekey: 2861;
  today_DT;
  OrganizationID: 21;
  imageScan;
  viewworkorder;

 // rootPage:any =TabsEmployeePage;

  constructor(public workOrderService: WorkOrderService,
     private barcodeScanner: BarcodeScanner,private router: Router
     ,private location: Location) { }

  ngOnInit() {
    
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
