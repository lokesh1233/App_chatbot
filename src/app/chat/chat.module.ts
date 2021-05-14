import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router';
import { ChatAvatarComponent } from './chat-avatar/chat-avatar.component'
import { ChatLoginComponent } from './chat-login/chat-login.component'
import { ChatWidgetComponent } from './chat-widget/chat-widget.component'
import { ChatInputComponent } from './chat-input/chat-input.component'
import { MatDialogModule } from '@angular/material/dialog';
import { ChatHeaderComponent } from './chat-header/chat-header.component'
import { ChatConfigComponent } from './chat-config/chat-config.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ChatService } from '../chat.service';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarModule, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {ToastrModule} from 'ngx-toastr'
import { TablefilterPipe } from '../tablefilter.pipe'
import { MultiSelectfilterPipe } from '../multiSelectfilter.pipe'
import { TablesorterPipe } from '../tablesorter.pipe'
import { NgMultiSelectDropDownModule, MultiSelectComponent } from 'ng-multiselect-dropdown';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true
};

@NgModule({
  imports: [ MatIconModule, MatButtonModule, MatButtonToggleModule,
      CommonModule, FormsModule, ReactiveFormsModule,
      PerfectScrollbarModule, NgxDaterangepickerMd.forRoot(), MatDialogModule, NgMultiSelectDropDownModule.forRoot(), ToastrModule.forRoot()],
  declarations: [
    ChatAvatarComponent, ChatLoginComponent, ChatWidgetComponent,
    ChatInputComponent, ChatConfigComponent, ChatHeaderComponent, TablefilterPipe, TablesorterPipe, MultiSelectfilterPipe],
  exports: [ChatHeaderComponent, ChatLoginComponent, ChatWidgetComponent, ChatConfigComponent, MatIconModule, MatButtonModule, MatButtonToggleModule],
  entryComponents: [ChatHeaderComponent, ChatLoginComponent, ChatWidgetComponent, ChatConfigComponent],
  providers: [ChatService, {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }],

})
export class ChatModule { }
