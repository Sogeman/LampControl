
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HueService, Group, Light, Scene } from '../hue.service';
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
  isSceneCreation: boolean;
  isSceneEdit: boolean;
  chosenScene: Scene;

  constructor(private hueService: HueService, private manipulationService: ManipulationService) {
   }

  ngOnInit() {
    if (localStorage.getItem('bridgeIp')) {
      this.refreshAllGroupsOnly();
    }
  }

  filterGroups(list: Array<Group>): Array<Group> {
    const filteredGroups = [];
    for (const key in list) {
      if (list.hasOwnProperty(key)) {
        filteredGroups[key] = list[key];
      }
    }
    return filteredGroups;
  }

  getGroupImage(roomClass: string, state: string): string {
    return this.manipulationService.getClassImage(roomClass, state);
  }


  refreshSingle(id: number) {
    this.hueService.retrieveSingleGroup(id)
      .then(group => this.selectedGroup = group)
      .then(() => this.groupId = id);
  }

  refreshAllGroupsOnly() {
    this.hueService.retrieveAllGroups()
      .then(groups => this.groupList = this.filterGroups(groups));
  }

  refreshAll() {
    this.hueService.retrieveAllGroups()
      .then(groups => this.groupList = this.filterGroups(groups))
      .then(() => this.groupsRefreshed.emit());
  }

  toggleGroup(groupState: boolean, id: number) {
    this.hueService.toggleGroup(groupState, id)
      .then(() => this.refreshAll());
  }

  toggleGroupDetail(lightState: boolean, id: number) {
    this.hueService.toggleGroup(lightState, id)
      .then(() => this.refreshSingle(id));
  }

  viewSelectedGroup(id: number) {
    this.hueService.retrieveSingleGroup(id)
      .then(group => {
        if (group.lights.length < 1) {
          this.isChangingLights = true;
          this.groupId = id;
          this.selectedGroup = group;
        } else {
          this.selectedGroup = group;
        }
        })
      .then(() => this.groupId = id);
  }

  clearSelectedGroup() {
    this.selectedGroup = null;
    this.refreshAll();
  }


  clearGroupCreation() {
    this.isChangingLights = false;
    this.isGroupCreation = false;
    this.refreshAllGroupsOnly();
  }

  saveGroupName(value: string, id: number, type: string) {
    this.hueService.changeName(value, id, type)
      .then(() => this.refreshSingle(id));
  }

  changeState(state: string, id: number) {
    const changeState = this.manipulationService.calculateChangeLightState(state);
    this.hueService.updateState('groups', changeState.xy, changeState.bri, id)
      .then(() => this.refreshSingle(id));
  }

  deleteSelectedGroup(id: number) {
    this.hueService.deleteEntity(id, 'groups')
      .then(() => this.clearSelectedGroup())
      .then(() => this.isChangingLights = false);
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

  startSceneEdit(scene: Scene) {
    this.isSceneEdit = true;
    this.chosenScene = scene;
  }

}
