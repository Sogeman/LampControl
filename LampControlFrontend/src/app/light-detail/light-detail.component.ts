import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ManipulationService } from '../manipulation.service';

export interface Light {
  name: string;
  state: {
    brightness: number;
    hue: number;
    on: boolean;
    xy: [number];
  };
}

@Component({
  selector: 'app-light-detail',
  templateUrl: './light-detail.component.html',
  styleUrls: ['./light-detail.component.css']
})
export class LightDetailComponent implements OnInit {

  @Output() back = new EventEmitter();
  @Output() lightToggled = new EventEmitter<boolean>();
  @Output() stateChange = new EventEmitter<string>();
  @Output() nameChange = new EventEmitter();
  @Input() selectedLight: Light;
  @Input() id: number;
  private _lightState = '';
  brightness: number;

  @Input('lightState')
  set lightState(lightState: string) {
    this._lightState = lightState;
    this.stateChange.emit(lightState);
  }
  get lightState(): string { return this._lightState; }

  constructor(private manipulationService: ManipulationService) { }

  ngOnInit() {
    const rgb = this.manipulationService.convertXYtoRGB(this.selectedLight.state.xy);
    this.lightState = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
  }

  backButtonClicked() {
    this.back.emit();
  }

  lightClicked() {
    this.lightToggled.emit(this.selectedLight.state.on);
  }

  startNameSave(value: string, id: number) {
    const name = {
      value: value,
      id: id
    };
    this.nameChange.emit(name);
  }



}
