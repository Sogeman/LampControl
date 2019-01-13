import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HueService } from '../hue.service';

export class User {
  username: string;
  nickname: string;
  bridgeIp: string;
}

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  user: User;
  @Output() userCreated = new EventEmitter<User>();

  constructor(private hueService: HueService) {
    this.user = new User();
   }

  ngOnInit() {
    }

  startUserCreation() {
    this.hueService.createUser()
      .then(createdUser => this.user.username = createdUser[0].success.username) // saves username from api to local user
      .then(() => this.userCreated.emit(this.user)); // emits local user
    console.log('User created');
  }
}
