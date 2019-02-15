import { Component, OnInit, OnDestroy } from '@angular/core';
import { HueService } from '../hue.service';
import { User, UserService } from '../user.service';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  user: User;
  isShowingDepartures: boolean;
  loading: boolean;
  timer: Subscription;

  constructor(private hueService: HueService, private userService: UserService) { }

  ngOnInit() {
    this.loading = true;
    this.user = new User();
    if (localStorage.getItem('username')) {
      this.hueService.checkUsername(localStorage.getItem('username'))
      .then(response => this.extractError(response)) // returns 'error' or 'no error'
      .then(message => message === 'error' ? this.userNotAuthorized() : this.assignUserDataFromLocalStorage());
    } else {
      this.getBridgeUrl();
      this.fireLoadingTimer();
    }
    if (this.user.bridgeIp === undefined) {
      this.getBridgeUrl();
    }
  }

  ngOnDestroy() {
    this.timer.unsubscribe();
  }

  extractError(response: any): string {
    if (response[0]) {
      return Object.keys(response[0]).join();
    }
    return 'no error';
  }

  userNotAuthorized() {
    this.userService.deleteUser(parseInt(localStorage.getItem('id'), 10));
    this.clearLocalStorage();
    this.fireLoadingTimer();
  }

  assignUserDataFromLocalStorage() {
    this.user.username = localStorage.getItem('username');
    this.user.nickname = localStorage.getItem('nickname');
    this.user.bridgeIp = localStorage.getItem('bridgeIp');
    this.user.userId = parseInt(localStorage.getItem('id'), 10);
    this.fireLoadingTimer();
  }

  setUser(user: User) {
    console.log(user, 'set User');
    this.user = user;
    this.setLocalStorage(this.user);
  }

  setLocalStorage(user: User) {
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

  fireLoadingTimer() {
    this.timer = timer(400).subscribe(() => this.loading = false);
  }


  clearLocalStorage() {
    localStorage.clear();
  }

  userLoggedOut() {
    this.clearLocalStorage();
    this.user.username = null;
    this.loading = true;
    this.fireLoadingTimer();
  }
}
