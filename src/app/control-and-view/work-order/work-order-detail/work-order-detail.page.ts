import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkOrderService } from '../../../service/work-order.service';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
@Component({
  selector: 'app-work-order-detail',
  templateUrl: './work-order-detail.page.html',
  styleUrls: ['./work-order-detail.page.scss'],
})
export class WorkOrderDetailPage implements OnInit {
  worKey$;
  viewEmpWorkorderDetails;
  profile;
  toServeremployeekey;
  OrganizationID;

  constructor(public workOrderService: WorkOrderService,
     private route: ActivatedRoute, 
     private router: Router,
     private location: Location) {
    this.route.params.subscribe(params => this.worKey$ = params.workOrderKey);
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
  convert_DT(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  }

  ngOnInit() {

    var token = localStorage.getItem('token');
    localStorage['token'] = token;
    var encodedProfile = token.split('.')[1];
     this.profile = JSON.parse(this.url_base64_decode(encodedProfile));
     this.toServeremployeekey = this.profile.employeekey;
     this.OrganizationID = this.profile.OrganizationID;

    this.workOrderService.workorderDetails(this.worKey$,this.OrganizationID).subscribe((data: any[]) => {
      this.viewEmpWorkorderDetails = data;


    });
  }
  GoBack() {
    // this.router.navigateByUrl('workorder-supervisor-view');
    this.location.back();
  }

}
