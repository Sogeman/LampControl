import { Component, OnInit } from '@angular/core';
import { HueService } from '../hue.service';
import { User } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;

  constructor(private hueService: HueService) { }

  ngOnInit() {
    this.user = new User();
    if (localStorage.getItem('username')) {
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
    this.setLocalStorage();
    console.log('Saved userdata to storage');
  }

  setLocalStorage() {
    localStorage.setItem('username', this.user.username);
    localStorage.setItem('nickname', this.user.nickname);
  }
}
