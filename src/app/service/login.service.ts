import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConnectionSettings } from "./connectionSetting";
import { HTTP } from '@ionic-native/http/ngx';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient, private httppost: HTTP) { }


  authent(obj) {
    const url = ConnectionSettings.AbsUrl + '/authenticate';
    return this
      .http
      .post(url, obj);
  }

  setCurrentLocation(obj) {
    const url = ConnectionSettings.Url + '/backgroundGeoLocation';
    return this
      .httppost
      .post(url, obj, {});
  }
}
