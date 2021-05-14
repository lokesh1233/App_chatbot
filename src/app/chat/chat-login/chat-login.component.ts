import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core'
import { fadeIn, fadeInOut } from '../animations'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { ChatService } from '../../chat.service'
import { IpcRenderer } from 'electron';
// const { remote } = (<any>window).require('electron');
import { DataService } from 'src/app/data/data.service';
const randomMessages = [
  ':)',
]

// const main_url = "http://172.17.39.193:5005"
const main_url = "http://192.168.6.224:5005";
const auth_url = "api/auth";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Authorization'
  })
};
const rand = max => Math.floor(Math.random() * max)
const getRandomMessage = () => randomMessages[rand(randomMessages.length)]

@Component({
  selector: 'chat-login',
  templateUrl: './chat-login.component.html',
  styleUrls: ['./chat-login.component.css'],
  animations: [fadeInOut, fadeIn],
  providers: [ChatService]
})
export class ChatLoginComponent implements OnInit {
  @ViewChild('bottom', { static: false }) bottom: ElementRef;
  @Input() public theme: 'blue' | 'grey' | 'red' = 'blue';

  private ipc: IpcRenderer;
  public operator = {
    name: 'HRBot',
    status: 'online',
    avatar: 'assets/images/received.jpg'
  }
  registerForm: FormGroup;
  submitted = false;
  credentialError = ""
  isLoginLoading = false
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router,
    private dom: DomSanitizer, private formBuilder: FormBuilder, private service: ChatService,
    private dataService: DataService) {
      
    if ((<any>window).require) {
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('=================Outside Electron=================');
    }
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    // this.ipc.on("message",(e,text)=>{
    //   console.log(text, " : Update available : ", e)
    // })
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }


  onSubmitSucess(res){
    if(typeof (res) == 'string') {
      // console.log("authorization :", this.service.parseAuthorizationKey(res)[0]);
      const { employeeCode:userId, token, city, given_name } = this.service.parseAuthorizationKey(res)[0];
      const details = [{
        isLogin:true, 
        given_name:given_name
      }];
      this.isLoginLoading = false;
      this.dataService.setLoginDetails(details);
      this.router.navigateByUrl(`chat/${userId}`); //userId:'SP2842'
    }else{
      this.onSubmitError()
    }
  }

  onSubmitError(err="Invalid Credentials"){
    // remote.dialog.showErrorBox("", "Invalid Credentials");
    this.credentialError = err;
    this.registerForm.reset();
    this.ngOnInit();
    this.isLoginLoading = false;
  }

  onSubmit() {
    this.submitted = true;
    this.router.navigate(['chat']);
    this.router.navigateByUrl(`chat/1010757}`);
    return;
    this.credentialError = "";
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.credentialError = "Invalid credentials"
      // remote.dialog.showErrorBox("","Something went wrong, please check your credentials.");
      return;
    } else {
      const { userName, password } = this.registerForm.value;
      // this.isLoginLoading = true;
      this.router.navigate(['chat']);
      this.service.webhookSubmit(userName, password, this.onSubmitSucess, this.onSubmitError, this)
      // this.service.onSubmit(userName, password).subscribe(res => {
      //   if (typeof (res) == 'string') {
      //     const { employeeCode:userId, token, city, given_name } = this.service.parseAuthorizationKey(res)[0];
      //     const details = [{
      //       isLogin:true, 
      //       given_name:given_name
      //     }];
      //     this.dataService.setLoginDetails(details);
      //     this.router.navigateByUrl(`chat/${userId}`); //userId:'SP2842'
      //   }
      // }, (err) => {
      //   // remote.dialog.showErrorBox("", "Something went wrong, please re-try.");
      //   this.registerForm.reset();
      //   this.ngOnInit();
      // });
    }
  }
  logout() {
    localStorage.removeItem('Authorization');
  }
  onOpenModal(){
    this.ipc.send('openModal');
  }
}
