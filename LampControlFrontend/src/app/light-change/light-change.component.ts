import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Group, Light } from '../hue.service';
import { HueService } from '../hue.service';
import { ManipulationService } from '../manipulation.service';

@Component({
  selector: 'app-light-change',
  templateUrl: './light-change.component.html',
  styleUrls: ['./light-change.component.css']
})
export class LightChangeComponent implements OnInit {

  @Output() back = new EventEmitter<boolean>();
  @Output() delete = new EventEmitter<number>();
  @Output() createGroup = new EventEmitter();
  @Output() saveGroup = new EventEmitter();
  @Input() id: number;
  @Input() selectedGroup: Group;
  @Input() isCreatingGroup: boolean;
  @Input() isChangingLights: boolean;
  usedLights: Array<Light>;
  unusedLights: Array<Light>;
  isListEmpty: boolean;
  helpText: string;
  groupName: string;
  selectedRoomClass: string;
  selectedLights: Array<any> = [];


  constructor(private hueService: HueService, private manipulationService: ManipulationService) { }

  ngOnInit() {
    if (!this.isCreatingGroup) {
      this.retrieveUsedLights();
    } else {
      this.retrieveUnusedLights();
    }
  }

  backButtonClicked() {
    this.back.emit(this.isCreatingGroup);
  }

  deleteButtonClicked() {
    this.delete.emit(this.id);
  }

  onLightSelection(id: number, isChecked: boolean) {
    if (isChecked) {
      this.selectedLights.push(id);
    } else {
      const index = this.selectedLights.indexOf(id);
      this.selectedLights.splice(index, 1);
    }
  }

  retrieveUnusedLights() {
    this.hueService.retrieveAllLights()
      .then(response => this.filterUsedLights(response)) // filter out lights already in a group, return unused
      .then(filteredIds => this.unusedLights = this.retrieveFilteredLights(filteredIds)) // get unused lights and put in variable
      .then(() => {
        if (this.isListEmpty === true) {
          this.helpText = 'Keine Lampen mehr frei. Bitte entferne zuerst Lampen aus anderen Räumen.';
        } else {
          this.helpText = '';
        }
      });
  }

  filterUsedLights(lights: Array<Light>): Promise<Array<number>> {
    let filtered: Array<number>;
    let lightsInGroups: Array<number>;
    let lightIds: Array<number>;
    return this.hueService.retrieveAllGroups()
      .then(responseGroups => lightsInGroups = this.filterLightsOutOfGroups(responseGroups)) // filter light ids out of groups
      .then(() => lightIds = this.stripIdsFromLightlist(lights)) // strip out the ids of all lights
      .then(() => filtered = lightIds.filter(lightId => !lightsInGroups.includes(lightId))); // filter out lights not already in a group
  }

  filterLightsOutOfGroups(groups: Array<Group>): number[] {
    let lights = [];
    for (const key in groups) {
      if (groups.hasOwnProperty(key)) { // push all light Ids into list
        lights.push(groups[key].lights);
      }
    }
    lights = [].concat.apply([], lights); // flatten array to one level, also removes empty arrays
    console.log(lights);
    return lights;
  }

  retrieveFilteredLights(lightIds: Array<number>): Array<Light> {
    const lightObjects = new Array();
    if (lightIds.length === 0) {
      this.isListEmpty = true;
    } else {
      this.isListEmpty = false;
    }
    lightIds.forEach(lightId => {
      this.hueService.retrieveSingleLight(lightId)
        .then(light => lightObjects[lightId] = light);
    });
    return lightObjects;
  }

  stripIdsFromLightlist(lights: Array<Light>): Array<number> {
    const lightIds = [];
    for (const key in lights) {
      if (lights.hasOwnProperty(key)) {
        lightIds.push(key);
      }
    }
    return lightIds;
  }

  onLightRemoval(id: number, isChecked: boolean) {
    if (isChecked) {
      this.selectedLights.push(id);
    } else {
      const index = this.selectedLights.indexOf(id);
      this.selectedLights.splice(index, 1);
    }
  }

  startGroupCreation(name: string, lights: Array<number>, roomClass: string) {
    this.createGroup.emit(this.manipulationService.createGroupAttributeBody(name, lights, roomClass));
  }

  startSavingGroup(name: string, lights: Array<number>) {
    this.saveGroup.emit(this.manipulationService.createGroupAttributeBody(name, lights, ''));
  }

  retrieveUsedLights() {
    let lightIds: Array<number>;
    this.hueService.retrieveSingleGroup(this.id)
      .then(group => lightIds = group.lights)
      .then(() => this.usedLights = this.retrieveFilteredLightList(lightIds))
      .then(() => this.selectedLights = lightIds)
      .then(() => this.retrieveUnusedLights());
  }

  retrieveFilteredLightList(lightIds: Array<number>): Array<Light> {
    const lights = [];
    lightIds.forEach(id => {
      this.hueService.retrieveSingleLight(id)
        .then(light => lights[id] = light);
    });
    return lights;
  }

}
