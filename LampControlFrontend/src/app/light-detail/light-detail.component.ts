import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ManipulationService } from '../manipulation.service';

export interface Light {
  name: string;
  state: {
    bri: number;
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
  @Output() delete = new EventEmitter<number>();
  @Output() lightToggled = new EventEmitter<boolean>();
  @Output() stateChange = new EventEmitter<string>();
  @Output() nameChange = new EventEmitter();
  @Input() selectedLight: Light;
  @Input() id: number;
  private _lightState = '';

  @Input('lightState')
  set lightState(lightState: string) {
    this._lightState = lightState;
    this.stateChange.emit(lightState);
  }
  get lightState(): string { return this._lightState; }

  constructor(private manipulationService: ManipulationService) { }

  ngOnInit() {
    const rgb = this.manipulationService.convertXYtoRGB(this.selectedLight.state.xy);
    let bri = this.selectedLight.state.bri;
    let alpha = ',';
    if (bri === 1) {
      bri = 0;
      alpha += bri.toString();
    } else if (bri === 254) {
      bri = 1;
      alpha = '';
    } else {
      bri = parseFloat((bri / 254).toFixed(2));
      alpha += bri.toString();
    }
    this.lightState = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + alpha + ')';
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

  startNameSave(value: string, id: number) {
    const name = {
      value: value,
      id: id
    };
    this.nameChange.emit(name);
  }



}
