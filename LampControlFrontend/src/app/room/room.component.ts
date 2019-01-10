import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HueService } from '../hue.service';
import { ManipulationService } from '../manipulation.service';

export interface Group {
  name: string;
  lights: [number];
  type: string; // 'Room'
  class: string; // Room name
  action: {
    on: boolean,
    bri: number,
    xy: [number]
  };
}

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  @Output() groupsRefreshed = new EventEmitter();
  groupList: Group;

  constructor(private hueService: HueService, public manipulationService: ManipulationService) { }

  ngOnInit() {
    if (localStorage.getItem('bridgeIp')) {
      this.hueService.retrieveAllGroups()
        .then(groups => this.groupList = groups)
        .then(() => console.log(this.groupList));
    }
  }

  refreshAllWithLights() {
    this.hueService.retrieveAllGroups()
      .then(groups => this.groupList = groups);
  }

  refreshAll() {
    this.hueService.retrieveAllGroups()
      .then(groups => this.groupList = groups);
    this.groupsRefreshed.emit();
  }

  toggleGroup(groupState: boolean, id: number) {
    this.hueService.toggleGroup(groupState, id)
    .then(() => this.refreshAll());
  }

}
