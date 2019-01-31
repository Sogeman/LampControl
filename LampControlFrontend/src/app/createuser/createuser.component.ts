import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HueService } from '../hue.service';
import { UserService, User } from '../user.service';

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
    this.userService.retrieveUser(this.user.nickname)
      .then(users => {
        if (users.length > 0) {
          this.hueService.checkUsername(users[0].username)
            .then(response => {
              if (response[0]) {
                return Object.keys(response[0]).join();
              }
            })
            .then(valid => {
              if (valid === 'error') {
                this.createUser('Username nicht mehr gültig!');
                this.userService.deleteUser(users[0].userId);
              } else {
                this.saveUser(users[0]);
              }
            });
        } else {
          this.createUser('');
        }
      });
  }

  saveUser(user: User) {
    this.userCreated.emit(user);
  }

  createUser(extraMessage: string) {
    this.hueService.createUser()
      .then(createdUser => {
        if (createdUser[0].success) {
          this.user.username = createdUser[0].success.username;
          this.userService.saveUser(this.user)
          .then(response => this.user.userId = response)
          .then(() => this.saveUser(this.user));
        } else {
          alert('Bridge Knopf drücken! ' + extraMessage);
          this.user.nickname = '';
        }
      });
  }

}
