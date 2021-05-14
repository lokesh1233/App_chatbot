import { Component, Input } from '@angular/core'

@Component({
  selector: 'chat-avatar',
  template: `
    <img [src]="image" class="avatar headerimg" *ngIf="image != ''"/>
    <span  class="avatar user-text" *ngIf="name != ''">{{name}}</span>
  `,
  styles: [`
    .avatar {
      height: 30px;
      width: 30px;
      border-radius: 50%;
      float: left;
      margin-right: 10px;
      margin-top: 5px;
      background-color: #ffb828;
      padding: 5px;
    }
    .user-text{
      background: #2f47c2;
      width: 30px;
      height: 30px;
      display: block;
      white-space: nowrap;
      text-align: center;
      line-height: 30px;
      color: #fff;
      border-radius: 50%;
      font-weight: 600;
      font-size: 12px;
    }
  `]
})
export class ChatAvatarComponent {
  @Input() public image: string
  @Input() public name: string
}
