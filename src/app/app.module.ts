import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ElementModule } from './element.module'
import { AppComponent } from './app.component'
import { ChatLoginComponent } from './chat/chat-login/chat-login.component'
import { ChatWidgetComponent } from './chat/chat-widget/chat-widget.component'
import { ChatService } from './chat.service'
import { AuthGuard } from './guard/auth.guard';
import { DataService } from './data/data.service';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true
};

const routes: Routes = [
  { path: '', component: ChatLoginComponent }, 
  {
    path: 'chat/:userId', component: ChatWidgetComponent, canActivate: [AuthGuard]
  },
  // {
  //   path: 'chat', component: ChatWidgetComponent, canActivate: []
  // }
];
@NgModule({
  imports: [
    // CarouselModule,
    
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ElementModule,
    HttpClientModule,
    PerfectScrollbarModule,
    RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'enabled' })],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [ChatService, AuthGuard, DataService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }],
  exports: [RouterModule],
  schemas: []
})

export class AppModule { }
