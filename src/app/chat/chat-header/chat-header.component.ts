import { Component, OnInit, AfterContentChecked, DoCheck } from '@angular/core';
import { fadeIn, fadeInOut } from '../animations'
import { Router} from '@angular/router';
import * as $ from 'jquery';
import { NgZone } from '@angular/core';
import { IpcRenderer } from 'electron';
import { DataService } from 'src/app/data/data.service';
// import { ChatWidgetComponent } from '../chat-widget/chat-widget.component';


@Component({
  selector: 'chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.css'],
  animations: [fadeInOut, fadeIn],
  providers: []
})
export class ChatHeaderComponent implements OnInit,AfterContentChecked,DoCheck {

  private ipc: IpcRenderer;
  isMaximized: boolean;
  isLogin: boolean; 
  isMenuVisible: boolean;
  public operator = {
		name: 'Athena',
		status: 'online',
		avatar: 'assets/images/Zeebot.svg'
	}
  shortName: any = "HR";
  menuState: boolean;
  public theme="blue_blue";
  // public toggleTheme=[{type:'blue_blue', colour:"blue", disabled:false, selectedClass : "blue_blue_button tgl_btn"},
  //   {type:'red_blue', colour:"red", disabled:false,  selectedClass : "red_blue_button tgl_btn"},
  //   {type:'blue_pink', colour:"pink", disabled:false, selectedClass : "blue_pink_button tgl_btn"}];
  public toggleTheme = []

  constructor(private zone: NgZone,
    private router: Router, private dataService : DataService) {

    if ((<any>window).require) {
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('App not running inside Electron!');
    }

    // $(document).ready(function () {
    //   console.log("==========onSignout hide/show1==========");
    //   let btclk = 0;
    //   $('.chat-profile').click(function () {
    //     console.log("==========onSignout hide/show2==========");
    //     btclk += 1;
    //     if (btclk % 2 != 0) {
    //       console.log("==========onSignout hide/show3==========");
    //       $('.profile-dropdown').css({ opacity: 0.0, visibility: "visible" }).animate({ opacity: 1.0 });
    //     } else {
    //       console.log("==========onSignout hide/show4==========");
    //       $('.profile-dropdown').css({ opacity: 0.0, visibility: "hidden" }).animate({ opacity: 1.0 }, 200);
    //     }
    //   });
    // });
  }
  ngOnInit(){
    this.showUserMenuIcon();
    this.dataService.currenttoggleTheme.subscribe(message =>{
      this.toggleTheme = message;
      this.toggleThemeHeader(message)
    } )
  }

  toggleThemeHeader(message){
    console.log(message);
    message.forEach(element => {
      if(element.disabled === true)
      {
        this.theme = element.type;
      }
    });
  }

  ngAfterContentChecked(){
  }
  ngDoCheck(){
    // this.toggleMenu();
    // this.dataService.getLoginDetails().subscribe((loginData)=>{
    //   const { isLogin, given_name } = loginData[0];
    //   this.isMenuVisible = isLogin;
    //   console.log(this.isMenuVisible, " : ngDoCheck : ", loginData[0]);
    //   // if(!given_name){
    //   //   this.shortName = given_name.split(" ")[0].substring(0,1)+given_name.split(" ")[1].substring(0,1)
    //   // }
    // });
  }
  showUserMenuIcon(){
    this.zone.run(()=>{
          this.dataService.getLoginDetails().subscribe((loginData)=>{
            const { isLogin, given_name } = loginData[0];
            this.isMenuVisible = isLogin;
            const data = given_name.split(" ");          
            if(given_name.length>0){
              this.shortName = data[0].substring(0,1)+""+data[1].substring(0,1);
            }
          });
    });
  }
  toggleMenu() {
    this.zone.run(()=>{
      this.menuState = this.menuState === true ? false : true;
   });
  }
  onSignOut(): void {
    localStorage.removeItem('Authorization');    
    this.zone.run(()=>{
      this.menuState =  this.menuState === true ? false : true;
    });
    const details = [{
      isLogin:false, 
      given_name:""
    }];
    this.dataService.setLoginDetails(details);    
    this.router.navigate(['']);
  }

  onMinimize() {
    const { remote } = (<any>window).require('electron');
    const win = remote.getCurrentWindow();
    win.minimize();
  }
  onMaximize() {
    const { remote } = (<any>window).require('electron');
    var win = remote.getCurrentWindow();
    win.maximize();
  }
  onMaximizeOrRestore() {
    const { remote } = (<any>window).require('electron');
    const app = remote.getCurrentWindow();
    if (app.isMaximized()) {
      this.isMaximized = app.isMaximized();
      app.unmaximize();
    } else {
      this.isMaximized = app.isMaximized();
      app.maximize();
    }
  }

  themeSelection(theme, toggleTheme){
    this.theme=theme;
    this.toggleTheme=toggleTheme;
  }

  themeSelectionEvent(val){

    if(typeof(val) == "object" && typeof(val.value) == "string"){
      this.dataService.changeTheme(val.value);
    }
 
    
    // this.themeSelection(val);
    // this.randomMessage('/themeColor{"color": "'+val+'"}', true, {}, 'default')
  }





  onExit() {
    const { remote } = (<any>window).require('electron');
    const win = remote.getCurrentWindow();
    win.close();
  }
  openHelp = (url)=>{
    const { shell } = (<any>window).require('electron');
    // const win = remote.getCurrentWindow();
    // win.webContents.on('new-window', function(e, url) {
      // e.preventDefault();
      shell.openExternal(url);
    // });
  }
}
