import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import {EmployeeTabMenuPage} from '../../menu-tab/employee-tab-menu/employee-tab-menu.page';
import {AlertController} from '@ionic/angular';
@Component({
  selector: 'app-employee-dash-board',
  templateUrl: './employee-dash-board.page.html',
  styleUrls: ['./employee-dash-board.page.scss'],
})
export class EmployeeDashBoardPage implements OnInit {

  welcome;
  isAuthenticated;
  //rootPage:any =TabsEmployeePage;

  constructor(private router: Router,public alertController: AlertController) { }

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
          this.router.navigateByUrl('EmployeeDashBoard');
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
          this.router.navigateByUrl('Login');
        }
      }]
    });

  await alert.present();
  }

  ngOnInit() {
  }
  LogOut() {
    this.presentAlert();
  }
}
