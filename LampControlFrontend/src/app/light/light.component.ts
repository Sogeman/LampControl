import { Component, OnInit } from '@angular/core';
import { HueService } from '../hue.service';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css']
})
export class LightComponent implements OnInit {

  lightList: Object;

  constructor(private hueService: HueService) {
  }

  ngOnInit() {
    if (localStorage.getItem('bridgeIp')) {
      this.hueService.retrieveAllLights()
        .then(lights => this.lightList = lights)
        .then(() => console.log(this.lightList));
    }
  }

  refresh() {
    this.hueService.retrieveAllLights()
      .then(lights => this.lightList = lights);
  }

  saveName(value: string, id: number) {
    this.hueService.changeLightName(value, id)
      .then(() => this.refresh());
  }

  toggleLight(LightState: boolean, id: number) {
    this.hueService.toggleLight(LightState, id)
      .then(() => this.refresh());
  }

  openColorPicker() {
    alert('colorpicker');
  }

  openBrightnessSlider() {
    alert('brightness slider');
  }

}
