import { Component, OnInit } from '@angular/core';
import { ToastController, Platform, NavController, LoadingController } from '@ionic/angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, Marker, GoogleMapsAnimation, MyLocation, ILatLng } from '@ionic-native/google-maps';
import { WorkOrderService } from '../../../service/work-order.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-find-employee',
  templateUrl: './find-employee.page.html',
  styleUrls: ['./find-employee.page.scss'],
})
export class FindEmployeePage implements OnInit {
  map: GoogleMap;
  address: string;
  toServeremployeekey;
  OrganizationID;
  employeeList;
  empStat;
  emp;
  EmployeeKey;
  locationDetails;
  lat;
  lng;
  constructor(public loadCtrl: LoadingController,
    public workOrderService: WorkOrderService,
    public toastCtrl: ToastController, private platform: Platform,
    public navCtrl: NavController, private location: Location) { }

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

  async ngOnInit() {
    // Since ngOnInit() is executed before `deviceready` event,
    // you have to wait the event.
    var token = localStorage.getItem('token');
    localStorage['token'] = token;
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.toServeremployeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;

    this.workOrderService.allemployees(this.toServeremployeekey, this.OrganizationID).subscribe((data: any[]) => {
      this.employeeList = data;
      this.empStat = false;
    });

    await this.platform.ready();

  }
  async getEmpLocation() {
    const loading = await this.loadCtrl.create({
      // spinner: 'hide',
      // duration: 5000,
      message: 'Please Wait while the map is being loaded...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    loading.present();
    this.workOrderService.getEmpLocation(this.EmployeeKey, this.OrganizationID).subscribe((data: any[]) => {
      this.locationDetails = data[0];
      this.empStat = true;
      for (var i = 0; i < this.employeeList.length; i++) {
        if (this.employeeList[i].EmployeeKey == this.EmployeeKey) {
          this.emp = this.employeeList[i].EmployeeText;
        }
      }
      this.lat = this.locationDetails.Latitude;
      this.lng = this.locationDetails.Longitude;
      loading.dismiss();

      this.loadMap(this.lat, this.lng);
    });
    // debugger;


  }

  loadMap(lat, lng) {
    this.map = GoogleMaps.create('map_canvas', {});
    this.goToMyLocation(lat, lng);
  }

  goToMyLocation(lat1, lng1) {
    this.map.clear();

    // Get the location of you
    this.map.getMyLocation().then((location: MyLocation) => {
      console.log(JSON.stringify(location, null, 2));
      // const latLng = new google.maps.LatLng(28.6117993, 77.2194934);
      let position1: ILatLng = {
        lat: lat1,
        lng: lng1
      };
      // Move the map camera to the location with animation
      this.map.animateCamera({
        target: position1, //location.latLng
        zoom: 17,
        duration: 5000
      });

      //add a marker
      let marker: Marker = this.map.addMarkerSync({
        title: '',
        snippet: '',
        position: position1,
        animation: GoogleMapsAnimation.BOUNCE
      });

      //show the infoWindow
      marker.showInfoWindow();

      //If clicked it, display the alert
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        this.showToast('clicked!');
      });

      this.map.on(GoogleMapsEvent.MAP_READY).subscribe(
        (data) => {
          console.log("Click MAP", data);
        }
      );
    })
      .catch(err => {
        //this.loading.dismiss();
        this.showToast(err.error_message);
      });
  }

  async showToast(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }
  GoBack() {// go back option
    // this.router.navigateByUrl('WorkOrderDashBoard');
    this.location.back();
  }
}