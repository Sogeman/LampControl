import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  @Output() logout = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  logoutClicked() {
    this.logout.emit();
  }

}
