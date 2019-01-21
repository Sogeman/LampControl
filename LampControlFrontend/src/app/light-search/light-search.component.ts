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
  helpText = {
    line: 'Nach Lampen suchen',
    line1: 'Nach Lampen suchen',
    line2: ''
};
  newLightsFound: boolean;
  newLights: Array<NewLight>;

  constructor(private hueService: HueService) { }

  ngOnInit() {
  }

  backButtonClicked() {
    this.back.emit();
  }

  startLightSearch() {
    this.hueService.searchForNewLights()
      .then(() => this.newLightsFound = true)
      .then(() => {
        this.helpText.line1 = 'Es wird nach Lampen gesucht, dies kann bis zu 20s dauern.';
        this.helpText.line2 = 'Bitte zur Hauptansicht zurückkehren und wenn notwendig aktualisieren.';
        }
      );
  }

}
