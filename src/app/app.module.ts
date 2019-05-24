import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {ManagerMenuPageModule} from './control-and-view/manager/manager-menu/manager-menu.module'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { Camera } from '@ionic-native/camera/ngx';
import { IonicRatingModule } from 'ionic4-rating';
import { Base64 } from '@ionic-native/base64/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,HttpClientModule,IonicRatingModule, AppRoutingModule,IonicModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen, 
    BarcodeScanner,
    // EmailComposer,
    FileTransfer, 
    FileTransferObject,
    Base64,
    Camera,
    HTTP,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
