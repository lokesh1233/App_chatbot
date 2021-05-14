import {environment} from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient) { }
  
  // main_url = "https://bot-api-prod.speridian.com"
  // main_url = "https://hrbot-api-qa.speridian.com"
  main_url = environment.apiURL
  webhookurl = "/webhooks/rest/webhook"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Authorization'
    })
  };



  webhookSubmit(userName, Password, sucessFn, errorFn, _self) {
    this.get_RasaService("/webhooks/rest/webhook", {
      "message": '/login',
      "sender": 'default',
      "metadata": {
        userdetails: {
          userK: true,
          Username: userName,
          Password: Password
        }
      }
    }, false).subscribe(data => {
      try {
        let custom_json = data[0]['custom']["json"]
        if (custom_json["isTokenRefreshed"] == true) {
          sucessFn.call(_self, custom_json["token"]); // Call success function
        } else {
          errorFn.call(_self, data[0]['custom']["text"]);
        }
      } catch (err) {
        errorFn.call(_self, data[0]['custom']["text"]);
      }
    }, err => {
      errorFn.call(_self); // Call error function 
    })
  }

  parseJwtToken(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };
  /**
   * 
   * @param token 
   */
  parseAuthorizationKey(token) {
    if (localStorage.getItem('Authorization') == undefined) {
      localStorage.setItem('Authorization', token)
    }
    return this.getAuthorizaionDetails()
  }
  getAuthorizaionDetails() {
    let authToken = localStorage.getItem('Authorization');
    let employeeCode = undefined;
    let city = undefined;
    let given_name = undefined;
    if (authToken != undefined) {
      let parseJWToken = this.parseJwtToken(authToken)
      employeeCode = parseJWToken['EmployeeCode'];
      city = parseJWToken['OfficeName']
      given_name = parseJWToken['given_name']
    }
    return [{ employeeCode: employeeCode, token: authToken, city: city, given_name: given_name }]
  }
  /**
   * 
   * @param callback 
   * @param _self 
   */
  weatherDataSet(callback, _self) {
    this.get_RasaService("/webhooks/rest/webhook", {
      "message": '/weather',
      "metadata": {}
    }, false).subscribe(data => {
      try {
        let custom_json = data[0]['custom']["json"]
        if (custom_json["weatherData"] instanceof Object) {
          callback.call(_self, custom_json["weatherData"]); // Call success function
        }
      } catch (err) {
        // errorFn.call(_self);
      }
    }, err => {
      // errorFn.call(_self); // Call error function 
    }
    )
  }

  get_RasaService(url, postData, isToken) {
    if (isToken == true) {
      this.httpOptions.headers =
        this.httpOptions.headers.set('Access-Control-Allow-Origin', '*');
    }
    const { employeeCode, token } = this.getAuthorizaionDetails()[0]
    // postData['sender'] = employeeCode == undefined ? 'default' : employeeCode
    postData['sender'] = employeeCode == undefined ? 'default' : postData['sender'] == undefined ? employeeCode:postData['sender']
    try {
      postData['metadata']['environment'] = 'APP'
      postData['metadata']['token'] = token
    } catch{
      postData['metadata'] = { 'token': token }
    }

    return this.http.post(this.main_url + this.webhookurl, postData, this.httpOptions)
  }

  openLink = (url)=>{
    const { shell } = (<any>window).require('electron');
      shell.openExternal(url);
  }


}
