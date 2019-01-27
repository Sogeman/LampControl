import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HueService } from '../hue.service';
import { ManipulationService } from '../manipulation.service';

@Component({
  selector: 'app-scene-input',
  templateUrl: './scene-input.component.html',
  styleUrls: ['./scene-input.component.css']
})
export class SceneInputComponent implements OnInit {

  @Output() back = new EventEmitter();
  @Input() chosenScene: any;
  sceneColor: string;
  name: string;
  color: string;
  id: number;

  constructor(private hueService: HueService, private manipulationService: ManipulationService) { }

  ngOnInit() {
    if (this.chosenScene) {
      this.name = this.chosenScene.value.name;
      this.id = this.chosenScene.value.id;
      this.sceneColor = this.chosenScene.value.rgb;
    } else {
      this.name = '';
    }
  }

  backButtonClicked() {
    this.clearScene();
    this.back.emit();
  }

  saveScene(name: string, color: string) {
    if (this.chosenScene) {
      this.hueService.saveScene(name, color, this.chosenScene.value.id)
        .then(() => this.back.emit());
    } else  {
      this.hueService.saveScene(name, color, null)
        .then(() => this.back.emit());
    }
  }

  clearScene() {
    this.name = '';
    this.color = '';
    this.id = null;
  }
}
