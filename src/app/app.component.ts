import { Component } from '@angular/core'
import { Router } from '@angular/router';
import { ChatService } from './chat.service';
import { DataService } from './data/data.service';
// <chat-config [(theme)]="theme"></chat-config>
@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.css'],
	providers: [ChatService, DataService]
})
export class AppComponent {
	// public theme = 'blue';	 
	constructor(private router: Router, private chatService: ChatService, private dataService : DataService) {
		// localStorage.clear()
		
		const authToken = localStorage.getItem("Authorization");
		const data = localStorage.getItem("data");
		
		if((authToken != undefined || authToken != null) && typeof (authToken) == 'string' && typeof(data) == 'string') {
			const {employeeCode:userId } = this.chatService.parseAuthorizationKey(authToken)[0];
			this.router.navigateByUrl(`chat/10107575`);
		}else{
			const details = [{
				isLogin:false, 
				given_name:""
			}];
			this.dataService.setLoginDetails(details);
		}
	}
 
}