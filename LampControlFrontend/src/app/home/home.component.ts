import { Component, OnInit } from '@angular/core';
import { User } from '../createuser/createuser.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;

  constructor(private cookieService: CookieService) { }

  ngOnInit() {
    this.user = new User();
    if (this.cookieService.get('username')) {
      this.user.username = this.cookieService.get('username');
      this.user.nickname = this.cookieService.get('nickname');
    }
  }

  setUser(user: User) {
    this.user = user;
    console.log(this.user);
    this.setCookies();
  }

  setCookies() {
    this.cookieService.set('username', this.user.username);
    this.cookieService.set('nickname', this.user.nickname);
  }
}
