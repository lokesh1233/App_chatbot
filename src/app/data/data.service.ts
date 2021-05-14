import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _sub = new BehaviorSubject<any[]>([]);
  private _loginData: any;  
  constructor() {
  }

  private toggleTheme = new BehaviorSubject<any[]>([]);
  currenttoggleTheme = this.toggleTheme.asObservable();

  private theme = new BehaviorSubject("blue_blue");
  currentTheme = this.theme.asObservable();

  changeTheme(message: 'blue_blue') {
    this.theme.next(message)
  }

  changeToggleTheme(message: any[]) {
    this.toggleTheme.next(message)
    
    // console.log(this.theme.value)
    // console.log(this.currentTheme)
    // console.log(this.currenttoggleTheme)
  }


  public getLoginDetails():Observable<any[]> {      
      if(this._sub.getValue().length){      
        // console.log("========get login details1 ", this._sub);
        return this._sub;
      } else {
        this._sub.next(JSON.parse(localStorage.getItem("data")));
        // console.log("========get login details2 ", this._sub);
        return this._sub;
      }
  }
  public setLoginDetails(arg1:any[]) {
    // console.log("========set login details ", arg1);
    this._loginData = arg1;    
    localStorage.setItem("data",JSON.stringify(this._loginData));
    this._sub.next(this._loginData);
  }
   
}
