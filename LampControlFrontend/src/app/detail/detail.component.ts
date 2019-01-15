import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ManipulationService } from '../manipulation.service';

export class Light {
  name: string;
  state: {
    bri: number;
    on: boolean;
    xy: number[];
  };
}

export class Group {
  name: string;
  lights: number[];
  type: string; // 'Room'
  class: string; // Room name
  action: {
    on: boolean,
    bri: number,
    xy: number[]
  };
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @Output() back = new EventEmitter();
  @Output() delete = new EventEmitter<number>();
  @Output() lightToggled = new EventEmitter<boolean>();
  @Output() groupToggled = new EventEmitter<boolean>();
  @Output() stateChange = new EventEmitter<string>();
  @Output() nameChange = new EventEmitter();
  @Input() selectedLight: Light;
  @Input() selectedGroup: Group;
  @Input() id: number;
  private _lightState = '';
  private _groupState = '';

  @Input('lightState')
  set lightState(lightState: string) {
    this._lightState = lightState;
    this.stateChange.emit(lightState);
    console.log('lightstate set');
  }
  get lightState(): string {
     return this._lightState;
    }

  @Input('groupState')
  set groupState(groupState: string) {
    this._groupState = groupState;
    this.stateChange.emit(groupState);
    console.log('groupstate set');
  }
  get groupState(): string {
    return this._groupState;
  }

  constructor(private manipulationService: ManipulationService) { }

  ngOnInit() {
    const calculatedLightState = this.manipulationService.calculateLightState(this.selectedLight, this.selectedGroup);
    if (this.selectedLight) {
      this.lightState = calculatedLightState;
    } else {
      this.groupState = calculatedLightState;
    }
  }

  getGroupImage(roomClass: string, state: string): string {
    return this.manipulationService.getClassImage(roomClass, state);
  }

  backButtonClicked() {
    this.back.emit();
  }

  deleteButtonClicked() {
    this.delete.emit(this.id);
  }

  lightClicked() {
    this.lightToggled.emit(this.selectedLight.state.on);
  }

  groupClicked() {
    this.groupToggled.emit(this.selectedGroup.action.on);
  }

  startNameSave(value: string, id: number, type: string) {
    const name = {
      value: value,
      id: id,
      type: type
    };
    this.nameChange.emit(name);
  }


}
