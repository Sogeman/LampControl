import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HueService } from '../hue.service';

export class User {
  username: string;
  nickname: string;
}

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  user: User;
  HUE_BRIDGE_IP: string;
  @Output() userCreated = new EventEmitter<User>();

  constructor(private hueService: HueService) {
    this.user = new User();
   }

  ngOnInit() {
  }

  startUserCreation() {
    this.hueService.fetchBridgeList()
      .then(bridgeList => this.HUE_BRIDGE_IP = bridgeList[0].internalipaddress)
      .then(() => this.hueService.createUser(this.HUE_BRIDGE_IP))
      .then(createdUser => this.user.username = createdUser[0].success.username) // saves username from api to local user
      .then(() => this.userCreated.emit(this.user)); // emits local user
  }
}
