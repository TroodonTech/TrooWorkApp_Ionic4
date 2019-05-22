import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import {SupervisorTabMenuPage } from '../../menu-tab/supervisor-tab-menu/supervisor-tab-menu.page';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-super-visor-dash-board',
  templateUrl: './super-visor-dash-board.page.html',
  styleUrls: ['./super-visor-dash-board.page.scss'],
})
export class SuperVisorDashBoardPage implements OnInit {

  welcome;
  isAuthenticated;

 // rootPage: any = TabsSupervisorPage;
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
          this.router.navigateByUrl('SuperVisorDashBoard');
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
  LogOut()
  {
   this.presentAlert();

      }    

}
