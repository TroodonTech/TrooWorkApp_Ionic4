import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ConnectionSettings  } from "./connectionSetting";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient) { }


  authent(obj) {
    const url = ConnectionSettings.AbsUrl+'/authenticate';
    return this
      .http
      .post (url, obj);
  }
}
