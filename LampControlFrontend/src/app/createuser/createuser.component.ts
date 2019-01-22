import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HueService } from '../hue.service';
import { UserService, User } from '../user.service';

// export class User {
//   username: string;
//   nickname: string;
//   bridgeIp: string;
// }

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  user: User;
  @Output() userCreated = new EventEmitter<User>();

  constructor(private hueService: HueService, private userService: UserService) {
    this.user = new User();
  }

  ngOnInit() {
  }

  startUserCreation() {
    this.userService.retrieveUser(escape(this.user.nickname))
      .then(users => {
        if (users.length > 0) {
          this.saveUser(users[0]);
          console.log('User fetched from database');
        } else {
          this.createUser();
        }
      });
  }

  saveUser(user: User) {
    this.userCreated.emit(user);
  }

  createUser() {
    this.hueService.createUser()
      .then(createdUser => {
        if (createdUser[0].success) {
          this.user.username = createdUser[0].success.username;
          this.saveUser(this.user);
          this.userService.saveUser(this.user);
        } else {
          alert('Bridge Knopf drücken!');
        }
      });
  console.log('User created');
  }
}
