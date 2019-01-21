
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HueService, Group, Light } from '../hue.service';
import { ManipulationService } from '../manipulation.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  @Output() groupsRefreshed = new EventEmitter();
  groupList: Array<Group>;
  lightList: Array<Light>;
  selectedGroup: Group;
  groupId: number;
  isChangingLights: boolean;
  isGroupCreation: boolean;
  isChangingScene: boolean;

  constructor(private hueService: HueService, private manipulationService: ManipulationService) {
   }

  ngOnInit() {
    if (localStorage.getItem('bridgeIp')) {
      this.refreshAllGroupsOnly();
      console.log('all groups retrieved');
    }
  }

  filterGroups(list: Array<Group>): Array<Group> {
    const filteredGroups = [];
    Object.values(list).forEach((group) => {
      if (group.type === 'Room') {
        filteredGroups.push(group);
      }
    });
    return filteredGroups;
  }

  getGroupImage(roomClass: string, state: string): string {
    return this.manipulationService.getClassImage(roomClass, state);
  }


  refreshSingle(id: number) {
    this.hueService.retrieveSingleGroup(id)
      .then(group => this.selectedGroup = group)
      .then(() => this.groupId = id);
    console.log('group ' + id + ' retrieved');
  }

  refreshAllGroupsOnly() {
    this.hueService.retrieveAllGroups()
      .then(groups => this.groupList = this.filterGroups(groups));
      console.log('all groups retrieved');
  }

  refreshAll() {
    this.hueService.retrieveAllGroups()
      .then(groups => this.groupList = this.filterGroups(groups));
    this.groupsRefreshed.emit();
    console.log('all groups retrieved');
  }

  toggleGroup(groupState: boolean, id: number) {
    this.hueService.toggleGroup(groupState, id)
      .then(() => this.refreshAll());
    console.log('group ' + id + ' toggled');
  }

  toggleGroupDetail(lightState: boolean, id: number) {
    this.hueService.toggleGroup(lightState, id)
      .then(() => this.refreshSingle(id));
      console.log('group ' + id + ' toggled');
  }

  viewSelectedGroup(id: number) {
    this.hueService.retrieveSingleGroup(id)
      .then(group => {
        if (group.lights.length < 1) {
          this.isChangingLights = true;
          this.groupId = id;
          console.log('change to light add view');
        } else {
          this.selectedGroup = group;
          console.log('group ' + id + ' retrieved');
        }
        })
      .then(() => this.groupId = id);
  }

  clearSelectedGroup() {
    this.selectedGroup = null;
    this.refreshAll();
    console.log('return to homepage');
  }

  startCreatingGroup() {
    this.isGroupCreation = true;
    console.log('switch to group create view');
  }

  clearGroupCreation() {
    this.isChangingLights = false;
    this.isGroupCreation = false;
    this.refreshAllGroupsOnly();
    console.log('return to homepage');
  }

  saveGroupName(value: string, id: number, type: string) {
    this.hueService.changeName(value, id, type)
      .then(() => this.refreshSingle(id));
    console.log('groupname changed');
  }

  changeState(state: string, id: number) {
    const changeState = this.manipulationService.calculateChangeLightState(state);
    this.hueService.updateState('groups', changeState.xy, changeState.bri, id)
      .then(() => this.refreshSingle(id));
    console.log('groupstate ' + id + ' changed');
  }

  deleteSelectedGroup(id: number) {
    this.hueService.deleteEntity(id, 'groups')
      .then(() => this.clearSelectedGroup())
      .then(() => this.clearChangingLights());
    console.log('group ' + id + ' deleted and return to homepage');
  }

  createGroup(body: any) {
    this.hueService.createGroup(body)
      .then(() => this.clearGroupCreation());
  }

  saveGroup(body: any) {
    this.hueService.setGroupAttributes(body, this.groupId)
      .then(() => this.clearGroupCreation())
      .then(() => this.clearSelectedGroup());
  }

  startLightChange() {
    this.isChangingLights = true;
    this.isGroupCreation = false;
  }

  clearChangingLights() {
    this.isChangingLights = false;
  }

  startSceneChange() {
    this.isChangingScene = true;
  }

  clearSceneChange() {
    this.isChangingScene = false;
  }

}
