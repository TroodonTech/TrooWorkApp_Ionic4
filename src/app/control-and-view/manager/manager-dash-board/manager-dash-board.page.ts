import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {AlertController} from '@ionic/angular';
@Component({
  selector: 'app-manager-dash-board',
  templateUrl: './manager-dash-board.page.html',
  styleUrls: ['./manager-dash-board.page.scss'],
})
export class ManagerDashBoardPage implements OnInit {
  welcome;
  isAuthenticated;
  //rootPage: any = TabsPage;
  res;

  iconMenu = {
    theme: 'ios',
    type: 'hamburger'
};


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
          this.router.navigateByUrl('ManagerDashBoard');
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
  // confirmPopup()
  // {
  //   if(this.res)
  //   {
  //     this.welcome = '';
  //   this.isAuthenticated = false;
  //   delete sessionStorage.token;
  //  // $http.defaults.headers.common['Authorization'] = undefined;
  //   localStorage.clear();
  //   sessionStorage.clear();
  //   localStorage.removeItem('employeekey');
  //   delete localStorage.employeekey;
  //   //$state.go('login',{},{reload: true});





  //  this.router.navigateByUrl('Login');

  //   }
  //   else
  //   {
  //     return;
  //   }
   
    
  // }
  ngOnInit() {
  }
  LogOut()
   {
    this.presentAlert();

       }    

    
  

  inspection()
  {
    this.router.navigate(['/InspectionDashboard']);
  }

}
