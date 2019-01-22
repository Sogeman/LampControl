import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HueService, Light } from '../hue.service';
import { ManipulationService } from '../manipulation.service';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css']
})
export class LightComponent implements OnInit {

  @Output() lightsRefreshed = new EventEmitter();
  lightList: Array<Light>;
  selectedLight: Light;
  id: number;
  lightSearch: boolean;

  constructor(private hueService: HueService, private manipulationService: ManipulationService) {
  }

  ngOnInit() {
    if (localStorage.getItem('bridgeIp')) {
      this.refreshAllLightsOnly();
      console.log('all lights retrieved');
    }
  }

  refreshSingleLight(id: number) {
    this.hueService.retrieveSingleLight(id)
      .then(light => this.selectedLight = light)
      .then(() => this.id = id);
    console.log('light id ' + id + ' retrieved');
  }

  refreshAllLightsOnly() {
    this.hueService.retrieveAllLights()
      .then(lights => this.lightList = lights);
    console.log('all lights retrieved');
  }

  refreshAll() {
    this.hueService.retrieveAllLights()
      .then(lights => this.lightList = lights);
    this.lightsRefreshed.emit();
    console.log('all lights retrieved');
  }

  saveLightName(value: string, id: number, type: string) {
    this.hueService.changeName(value, id, type)
      .then(() => this.refreshSingleLight(id));
    console.log('lightname changed');
  }

  toggleLight(lightState: boolean, id: number) {
    this.hueService.toggleLight(lightState, id)
      .then(() => this.refreshAll());
    console.log('light ' + id + ' toggled');
  }

  toggleLightDetail(lightState: boolean, id: number) {
    this.hueService.toggleLight(lightState, id)
      .then(() => this.refreshSingleLight(id));
      console.log('light ' + id + ' toggled');
  }

  clearSelectedLight() {
    this.selectedLight = null;
    this.refreshAll();
    console.log('return to homepage');
  }

  changeState(state: string, id: number) {
    const changeState = this.manipulationService.calculateChangeLightState(state);
    this.hueService.updateState('lights', changeState.xy, changeState.bri, id)
      .then(() => this.refreshSingleLight(id));
    console.log('light ' + id + ' state changed to ' + state);
  }

  clearLightSearch() {
    this.lightSearch = false;
    this.refreshAll();
    console.log('return to homepage');
  }

  deleteSelectedLight(id: number) {
    this.hueService.deleteEntity(id, 'lights')
      .then(() => this.clearSelectedLight());
    console.log('light ' + id + ' deleted and return to homepage');
  }

}

