import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Light } from '../detail/detail.component';
import { HueService } from '../hue.service';
import { ManipulationService } from '../manipulation.service';

@Component({
  selector: 'app-light-remove',
  templateUrl: './light-remove.component.html',
  styleUrls: ['./light-remove.component.css']
})
export class LightRemoveComponent implements OnInit {

  @Output() back = new EventEmitter();
  @Output() saveGroup = new EventEmitter();
  @Input() isLightRemove: boolean;
  @Input() id: number;
  lightIds: number[];
  lightList: Light[];
  selectedLights: Array<number>;

  constructor(private hueService: HueService, private manipulationService: ManipulationService) { }

  ngOnInit() {
    this.hueService.retrieveSingleGroup(this.id)
      .then(group => this.lightIds = group.lights)
      .then(() => this.lightList = this.retrieveFilteredLightList(this.lightIds))
      .then(() => this.selectedLights = this.lightIds);
  }

  retrieveFilteredLightList(lightIds: number[]): Light[] {
    const lights = [];
    lightIds.forEach(id => {
      this.hueService.retrieveSingleLight(id)
        .then(light => lights[id] = light);
    });
    return lights;
  }

  onLightRemoval(id: number, isChecked: boolean) {
    if (isChecked) {
      this.selectedLights.push(id);
    } else {
      const index = this.selectedLights.indexOf(id);
      this.selectedLights.splice(index, 1);
    }
  }

  backButtonClicked() {
    this.back.emit();
  }

  startSavingGroup(lights: number[]) {
    this.saveGroup.emit(this.manipulationService.createGroupAttributeBody(name, lights, ''));

  }

}
