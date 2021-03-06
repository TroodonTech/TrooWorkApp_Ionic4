import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Router, Routes } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
// export class LoginPage {
//   constructor( private router: Router) { }
//   Username;
//   Password;
//   Login(Username,Password)
//   {
//   if(Username == 'manager' && Password=='manager')
//   { this.router.navigate(['menu1/manager-dash-board']);}
//   else if(Username == 'employee' && Password=='employee')
//   { this.router.navigate(['menu2/employee-dash-board']);}
//   else if(Username == 'supervisor' && Password=='supervisor')
//   { this.router.navigate(['menu3/supervisor-dash-board']);}
//   }
// }
export class LoginPage implements OnInit {
  constructor(private loginService: LoginService, private router: Router,
    private location: Location,
    private geolocation: Geolocation,
    public alertController: AlertController) { }
  // Username;
  // Password;
  // 
  auth;
  Username;
  Password;
  TenantID;
  loginDetalis;
  isAuthenticated;
  loginAl;

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
    return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
  }

  async LoginAlert() {
    const alert = await this.alertController.create({
      header: 'Login failed',
      subHeader: '',
      message: 'Please enter username , password and TenantID !',
      buttons: ['OK']
    });

    await alert.present();
  }

  async LoginAlert1() {
    const alert = await this.alertController.create({
      header: 'Login failed',
      subHeader: '',
      message: 'Please enter password!',
      buttons: ['OK']
    });

    await alert.present();
  }

  async LoginAlert2() {
    const alert = await this.alertController.create({
      header: 'Login failed',
      subHeader: '',
      message: 'Please enter username!',
      buttons: ['OK']
    });

    await alert.present();
  }

  async LoginAlert3() {
    const alert = await this.alertController.create({
      header: 'Login failed',
      subHeader: '',
      message: 'Please enter TenantID !',
      buttons: ['OK']
    });

    await alert.present();
  }

  async LoginAlert4() {
    const alert = await this.alertController.create({
      header: 'Login failed',
      subHeader: '',
      message: 'Invalid login credentials. Please enter correct credentials to login...',
      buttons: ['OK']
    });

    await alert.present();
  }

  async LoginAlert5() {
    const alert = await this.alertController.create({
      header: 'Login failed',
      subHeader: '',
      message: 'Invalid Login!!!',
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {
  }
  Login() {

    if (!this.Username && !this.Password && !this.TenantID) {
      this.LoginAlert();
      return;

    }

    if (this.Username && !this.Password) {
      this.LoginAlert1();
      return;
    }

    if (!this.Username && this.Password) {
      this.LoginAlert2();
      return;
    }

    if (this.Username && this.Password && !this.TenantID) {
      this.LoginAlert3();
      return;

    }

    this.auth = {
      uname: this.Username,
      pwd: this.Password,
      tid: this.TenantID
    };
    this.loginService.authent(this.auth).subscribe((data: any[]) => {
      this.loginDetalis = data;
      // tslint:disable-next-line:no-debugger
      //debugger;
      // if (this.loginDetalis.token !== null || this.loginDetalis.token !== '') {
      //   localStorage.setItem('token', this.loginDetalis.token);
      //   this.isAuthenticated = true;
      // } else {
      //  //debugger;
      //   this.isAuthenticated = false;
      //   localStorage.clear();
      //   localStorage.removeItem('employeekey');

      //   delete localStorage.employeekey;
      //  this.LoginAlert4();

      // }

      if (this.loginDetalis.token == null || this.loginDetalis.token == "" || data.length == 0) {
        this.isAuthenticated = false;
        localStorage.clear();
        localStorage.removeItem('employeekey');

        delete localStorage.employeekey;
        //  this.LoginAlert4();
      }
      else {
        localStorage.setItem('token', this.loginDetalis.token);
        this.isAuthenticated = true;
      }

      sessionStorage.token = this.loginDetalis.token;
      // $http.defaults.headers.common['Authorization'] = $window.sessionStorage.token;
      // console.log($http.defaults.headers.common['X-Auth-Token']);
      localStorage['token'] = this.loginDetalis.token;
      var encodedProfile = this.loginDetalis.token.split('.')[1];
      var profile = JSON.parse(this.url_base64_decode(encodedProfile));
      this.Username = profile.Username;
      debugger;
      if (this.isAuthenticated && profile.role === 'Manager') {

        // this.router.navigateByUrl('ManagerDashBoard');
        // this.reloading();
        this.locationTracker(profile.employeekey, profile.OrganizationID);
        this.router.navigate(['manager-menu/manager-dash-board']);

        // this.router.navigateByUrl('Menu/(menucontent:ManagerDashBoard)');

      } else if (this.isAuthenticated && profile.role === 'Employee' && profile.IsSupervisor === 0) {

        // this.router.navigateByUrl('EmployeeDashBoard');
        // this.reloading();
        this.locationTracker(profile.employeekey, profile.OrganizationID);
        this.router.navigate(['employee-menu/employee-dash-board']);
        // this.router.navigateByUrl('Menu/(menucontent:EmployeeDashBoard)');
      } else if (this.isAuthenticated && profile.role === 'Employee' && profile.IsSupervisor === 1) {

        // this.router.navigateByUrl('SuperVisorDashBoard');
        // this.reloading();
        this.locationTracker(profile.employeekey, profile.OrganizationID);
        this.router.navigate(['supervisor-menu/super-visor-dash-board']);
        // this.router.navigateByUrl('Menu/(menucontent:SuperVisorDashBoard)');
      }
      else {
        this.LoginAlert5();
        this.router.navigateByUrl('Login');
      }


    },
      res => {
        //debugger;
        //  this.loginAl="Invalid username & password";
        // var test = res;
        // alert("hi...");
        if (res.error.text === "Wrong user or password") {
          // console.log("Invalid username");
          this.LoginAlert4();

        }
        // alert("bye...");
      });


  }

  locationTracker(empKey, orgID) {

    var t = new Date();
    var y = t.getFullYear();
    var m = t.getMonth();
    var d = t.getDate();
    var h = t.getHours();
    var mi = t.getMinutes();
    var s = t.getSeconds();

    var today_DT = this.convert_DT(new Date());
    var p = "";
    p = today_DT + " " + h + ":" + mi + ":" + s;

    this.geolocation.getCurrentPosition().then((resp) => {

      resp.coords.longitude
      console.log("lant " + resp.coords.latitude + " long " + resp.coords.longitude);
      let backgroundlocation = {
        geolatitude: resp.coords.latitude,
        geolongitude: resp.coords.longitude,
        EmployeeKey: empKey,
        currenttime: p,
        OrganizationID: orgID
      }

      this.loginService.setCurrentLocation(backgroundlocation).then((data) => { });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  reloading() {
    if (window.localStorage) {
      if (!localStorage.getItem('firstLoad')) {
        localStorage['firstLoad'] = true;
        window.location.reload();
      }

      else
        localStorage.removeItem('firstLoad');
    }
  }
  showPassword(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
  }
}