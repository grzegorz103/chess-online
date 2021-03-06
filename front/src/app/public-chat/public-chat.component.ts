import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../environments/environment";
import * as Stomp from 'stompjs';
import {Message} from "./models/message";
import {Member} from "./models/member";
import {AuthService} from "../security/auth.service";
import {PublicChatService} from "./service/public-chat.service";
import 'moment/locale/pl';
@Component({
  selector: 'app-public-chat',
  templateUrl: './public-chat.component.html',
  styleUrls: ['./public-chat.component.scss']
})
export class PublicChatComponent implements OnInit {

  constructor(private auth: AuthService,
              public publicChatService: PublicChatService) {
  }

  ngOnInit() {
    this.joinChat();
  }

  private joinChat() {
    this.publicChatService.connect();
  }

  sendMessage() {
    this.publicChatService.sendMessage();
  }

}
