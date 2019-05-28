import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-supervisor-menu',
  templateUrl: './supervisor-menu.page.html',
  styleUrls: ['./supervisor-menu.page.scss'],
})
export class SupervisorMenuPage implements OnInit {

  selectedPath = '';
  welcome;
  isAuthenticated;
  loginDetalis;
  Username;

  pages = [

    {
      title: 'Supervisor DashBoard',//second
      url: '/supervisor-menu/super-visor-dash-board',
      icon: "home"
    },
   
    {
      title: ' WorkOrder',//first
      url: '/supervisor-menu/workorder-supervisor-view',
      icon: "logo-buffer"
    },
    {
      title: 'Scan For Work',//first
      url: '/supervisor-menu/scan-for-work-supervisor',
      icon: "barcode"
    },
    {
      title: 'Inspection Order',//first
      url: '/supervisor-menu/inspection-supervisor-view',
      icon: "create"
    },

    {
      title: 'Find Employee',
      url: '/supervisor-menu/find-employee-supervisor',
      icon: "search"
    },


    {
      title: 'Logout',
      // url:  '/manager-menu/login',
      icon:"log-out"
    }

  ];


  LogOut(){
    debugger;
    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Exit!',
      subHeader: '',
      message: 'Are you sure you want to quit?',
      inputs:[],
      buttons: [ {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
          // this.router.navigateByUrl('super-visor-dash-board');
        }
      },{
        text: 'Ok',
        handler: () => {
          console.log('Confirm Ok');
          this.welcome = '';
    this.isAuthenticated = false;
    delete sessionStorage.token;
   // $http.defaults.headers.common['Authorization'] = undefined;
    localStorage.clear();
    sessionStorage.clear();
    localStorage.removeItem('employeekey');
    delete localStorage.employeekey;
          this.router.navigateByUrl('login');
        }
      }]
    });

  await alert.present();
  }

  constructor(private router: Router,public alertController: AlertController) { }
  
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


    this.Username = profile.username;
  }

}
