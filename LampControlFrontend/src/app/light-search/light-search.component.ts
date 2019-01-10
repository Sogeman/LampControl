import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HueService } from '../hue.service';

export interface NewLight {
  name: string;
}

@Component({
  selector: 'app-light-search',
  templateUrl: './light-search.component.html',
  styleUrls: ['./light-search.component.css']
})
export class LightSearchComponent implements OnInit {

  @Output() back = new EventEmitter();
  helpText = 'Nach Lampen suchen';
  newLightsFound: boolean;
  newLights: NewLight[];

  constructor(private hueService: HueService) { }

  ngOnInit() {
  }

  backButtonClicked() {
    this.back.emit();
  }

  startLightSearch() {
    this.hueService.searchForNewLights()
      .then(response => {
        if (response[0].success) {
          this.newLightsFound = true;
        }
      })
      .then(() => this.helpText = 'Es wird nach Lampen gesucht, zurück zu allen Lampen')
      .then(() => this.startRetrievingNewLights);
  }

  startRetrievingNewLights() {
    this.hueService.getNewLights()
      .then(() => this.back.emit());
  }

}
