import { Component, OnInit } from '@angular/core';
import { User } from '../createuser/createuser.component';
import { CookieService } from 'ngx-cookie-service';
import { HueService } from '../hue.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;

  constructor(private cookieService: CookieService, private hueService: HueService) { }

  ngOnInit() {
    this.user = new User();
    if (this.cookieService.get('username')) {
      this.user.username = this.cookieService.get('username');
      this.user.nickname = this.cookieService.get('nickname');
      this.user.bridgeIp = this.cookieService.get('bridgeIp');
      console.log('Fetched userdata from cookies.');
    } else if (localStorage.getItem('username')) {
      this.user.username = localStorage.getItem('username');
      this.user.nickname = localStorage.getItem('nickname');
      this.user.bridgeIp = localStorage.getItem('bridgeIp');
      console.log('Fetched userdata from storage.');
    } else {
      this.hueService.fetchBridgeUrl()
        .then(bridgeIp => {
          localStorage.setItem('bridgeIp', bridgeIp);
          this.user.bridgeIp = bridgeIp;
          console.log('Saved Bridge IP');
      });
    }
  }

  setUser(user: User) {
    this.user = user;
    console.log('user created');
    console.log(this.user);
    this.setCookies();
    this.setLocalStorage();
    console.log('Saved userdata to cookies and storage');
  }

  setCookies() {
    this.cookieService.set('username', this.user.username);
    this.cookieService.set('nickname', this.user.nickname);
  }

  setLocalStorage() {
    localStorage.setItem('username', this.user.username);
    localStorage.setItem('nickname', this.user.nickname);
  }
}
