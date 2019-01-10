import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HueService } from '../hue.service';
import { Light } from '../light-detail/light-detail.component';
import { ManipulationService } from '../manipulation.service';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css']
})
export class LightComponent implements OnInit {

  @Output() lightsRefreshed = new EventEmitter();
  lightList: Light;
  selectedLight: Light;
  id: number;
  lightSearch: boolean;

  constructor(private hueService: HueService, private manipulationService: ManipulationService) {
  }

  ngOnInit() {
    if (localStorage.getItem('bridgeIp')) {
      this.hueService.retrieveAllLights()
        .then(lights => this.lightList = lights)
        .then(() => console.log(this.lightList));
    }
  }

  refreshSingle(id: number) {
    this.hueService.retrieveSingleLight(id)
      .then(light => this.selectedLight = light)
      .then(() => this.id = id);
  }

  refreshAllWithGroups() {
    this.hueService.retrieveAllLights()
      .then(lights => this.lightList = lights);
  }

  refreshAll() {
    this.hueService.retrieveAllLights()
      .then(lights => this.lightList = lights);
    this.lightsRefreshed.emit();
  }

  saveName(value: string, id: number) {
    this.hueService.changeLightName(value, id)
      .then(() => this.refreshSingle(id));
  }

  toggleLight(lightState: boolean, id: number) {
    this.hueService.toggleLight(lightState, id)
      .then(() => this.refreshAll());
  }

  toggleLightDetail(lightState: boolean, id: number) {
    this.hueService.toggleLight(lightState, id)
      .then(() => this.refreshSingle(id));
  }

  viewSelectedLight(id: number) {
    this.hueService.retrieveSingleLight(id)
      .then(light => this.selectedLight = light)
      .then(() => this.id = id);
  }

  clearSelectedLight() {
    this.selectedLight = null;
    this.refreshAll();
  }

  changeState(state: string, id: number) {
    const splitColor = this.manipulationService.getNumbersFromRgbString(state);
    const xyColor = this.manipulationService.convertRGBtoXY(splitColor);
    let brightness = Math.trunc(this.manipulationService.getBrightnessFromRgbString(state) * 254);
    if (brightness === null) {
      brightness = 254;
    } else if (brightness === 0) {
      brightness = 1;
    }
    this.hueService.updateState(xyColor, brightness, this.id) // this would kill any server instantly if more people used it at once
      .then(() => this.refreshSingle(id));
  }

  startAddingLights() {
    this.lightSearch = true;
  }

  clearLightSearch() {
    this.lightSearch = false;
    this.refreshAll();
  }

}

