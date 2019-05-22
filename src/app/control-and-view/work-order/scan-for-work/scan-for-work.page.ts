import { Component, OnInit } from '@angular/core';
import { WorkOrderService } from '../../../service/work-order.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';
// import { ManagerTabMenuPage  } from '../../menu-tab/manager-tab-menu/manager-tab-menu.page';
import {Location} from '@angular/common';

@Component({
  selector: 'app-scan-for-work',
  templateUrl: './scan-for-work.page.html',
  styleUrls: ['./scan-for-work.page.scss'],
})
export class ScanForWorkPage implements OnInit {

  inbarcode;
  toServeremployeekey: 2861;
  today_DT;
  OrganizationID: 21;
  imageScan;
  viewworkorder;
  //rootPage: any = TabsPage;

  constructor(public workOrderService: WorkOrderService, 
    private barcodeScanner: BarcodeScanner,
    private router: Router,
    private location: Location) { }

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
          console.log("inside view workorder");
          this.viewworkorder = data1;
        });
    }).catch(err => {
      console.log('Error', err);
    });
  }
  GoBack() {
    // this.router.navigateByUrl('ManagerDashBoard');
    this.location.back();
  }
}
