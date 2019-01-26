import { Component, OnInit } from '@angular/core';
import { HueService } from '../hue.service';
import { User, UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;
  isShowingDepartures: boolean;
  userIsValid: boolean;

  constructor(private hueService: HueService, private userService: UserService) { }

  ngOnInit() {
    this.user = new User();
    if (localStorage.getItem('username')) {
      this.hueService.checkUsername(localStorage.getItem('username'))
        .then(response => this.extractError(response)) // returns 'error' or 'no error'
        .then(message => message === 'error' ? this.userNotAuthorized() : this.assignUserDataFromLocalStorage());
    } else {
      this.getBridgeUrl();
    }
    if (this.user.bridgeIp === undefined) {
      this.getBridgeUrl();
    }
  }

  extractError(response: any): string {
    if (response[0]) {
      return Object.keys(response[0]).join();
    }
    return 'no error';
  }

  userNotAuthorized() {
    this.userIsValid = false;
    this.userService.deleteUser(parseInt(localStorage.getItem('id'), 10));
    this.userService.clearLocalStorage();
  }

  assignUserDataFromLocalStorage() {
    this.user.username = localStorage.getItem('username');
    this.user.nickname = localStorage.getItem('nickname');
    this.user.bridgeIp = localStorage.getItem('bridgeIp');
    this.user.userId = parseInt(localStorage.getItem('id'), 10);
  }

  setUser(user: User) {
    console.log(user, 'set User');
    this.user = user;
    this.setLocalStorage(this.user);
  }

  setLocalStorage(user: User) {
    console.log(user, 'setlocal');
    console.log(user.nickname);
    console.log(user.userId);
    console.log(user.username);
    localStorage.setItem('username', user.username);
    localStorage.setItem('nickname', user.nickname);
    localStorage.setItem('id', JSON.stringify(user.userId));
  }

  getBridgeUrl() {
    this.hueService.fetchBridgeUrl()
    .then(bridgeIp => {
      localStorage.setItem('bridgeIp', bridgeIp);
      this.user.bridgeIp = bridgeIp;
    });
  }
}
