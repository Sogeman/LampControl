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
    } else if (localStorage.getItem('username')) {
      this.user.username = localStorage.getItem('username');
    }
    this.hueService.fetchBridgeUrl()
      .then(bridgeIp => {
        localStorage.setItem('bridgeIp', bridgeIp);
        this.user.bridgeIp = bridgeIp;
    });
  }

  setUser(user: User) {
    this.user = user;
    console.log(this.user);
    this.setCookies();
    this.setLocalStorage();
  }

  setCookies() {
    this.cookieService.set('username', this.user.username);
  }

  setLocalStorage() {
    localStorage.setItem('username', this.user.username);
  }
}
