import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Camera,CameraOptions } from '@ionic-native/camera/ngx';

import { DomSanitizer } from '@angular/platform-browser';
import { Base64 } from '@ionic-native/base64/ngx';
import { LoadingController } from '@ionic/angular';
import { WorkOrderService } from "../../../service/work-order.service";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { ConnectionSettings } from "../../../service/connectionSetting";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.page.html',
  styleUrls: ['./file-upload.page.scss'],
  providers: []
})

export class FileUploadPage implements OnInit {

  fileUrl: any = null;
  respData: any;
  worKey$;
  capturedimage;
  base64Image;
  imageFileName:any
  capturedimageName;
  capturedimagePath;
  uploadPhoto = {};
  toServeremployeekey;
  OrganizationID;
  today_DT;
  imageName;
  uploadflag;
  userrole;

  constructor(public workOrderService: WorkOrderService,
    public loadingController: LoadingController,
    private transfer: FileTransfer, 
    private camera: Camera,
    private router: Router, 
    private base64: Base64,
    private route: ActivatedRoute,
    private location: Location,
    public loadCtrl: LoadingController,
    private DomSanitizer: DomSanitizer,

   ) 
{ 
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
    return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
  }

  convert_DT(str) { // date convertion function YYYY/MM/DD
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  }

  capture(){

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      // targetWidth: 1000,
      // targetHeight: 1000,
      correctOrientation:true
    };
    this.uploadflag=true;
    this.camera.getPicture(options).then((imageData) => {
      this.base64.encodeFile(imageData).then((base64File: string) => {
        this.base64Image=base64File;
        this.capturedimagePath=imageData;
        this.imageName=imageData.substr(imageData.lastIndexOf('/') + 1)
        console.log(base64File);
      }, (err) => {
          console.log(err);
        });
    }, (err) => {
        alert("error "+JSON.stringify(err))
        });   
  }

  async presentLoadingWithOptions() {

    const loading = await this.loadCtrl.create({
      // spinner: 'hide',
     // duration: 5000,
      message: 'Please wait...',
      translucent: true, 
      cssClass: 'custom-class custom-loading'
    });
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: this.capturedimagePath.substr(this.capturedimagePath.lastIndexOf('/') + 1)
    }
    loading.present();
    fileTransfer.upload(this.capturedimagePath, ConnectionSettings.Url+'/uploadImageFromSmallDevices', options)
      .then((data) => {
      var t=new Date();
      var y=t.getFullYear();
      var m=t.getMonth();
      var d=t.getDate();
      var h=t.getHours();
      var mi=t.getMinutes();
      var s=t.getSeconds();
    
      this.today_DT = this.convert_DT(new Date());
        var p="";
        p= this.today_DT+" "+h+":"+mi+":"+s;

      console.log(this.imageName+"imagename" + this.worKey$ + "worKey" + this.toServeremployeekey
      + "toServeremployeekey"+ this.OrganizationID + "OrganizationID" + p +"p"  );
      this.uploadPhoto=
      {
        Filename:this.imageName,
        Workorderkey:this.worKey$,
        EmployeeKey: this.toServeremployeekey,
        OrganizationID:this.OrganizationID,
        complete_Time:p
      };
      this.workOrderService.fileUploadDetails(this.uploadPhoto).then(data => {
        loading.dismiss();
        alert("WorkOrder completed Successfully");
        // this.router.navigateByUrl('Menu/(menucontent:WorkorderViewEmp)')
        if(this.userrole === 'Employee'){
          this.router.navigate(['/work-order-complete', this.worKey$]);
        }
        if(this.userrole === 'Supervisor'){
          this.router.navigate(['/workorder-supervisor-view-detail', this.worKey$]);
          }
        });
      });

  }

  ngOnInit() {
    // debugger;
    var token = localStorage.getItem('token');
    localStorage['token'] = token;
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.toServeremployeekey=profile.employeekey;
    this.OrganizationID = profile.OrganizationID;
    this.uploadflag=false;
    this.userrole=profile.role;
  }
  GoBack() {
    this.location.back();
  }
}
