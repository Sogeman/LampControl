import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Scene, HueService } from '../hue.service';
import { ManipulationService } from '../manipulation.service';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements OnInit {

  @Output() back = new EventEmitter();
  @Input() groupId: number;
  sceneList: Array<Scene>;

  constructor(private hueService: HueService, private manipulationService: ManipulationService) { }

  ngOnInit() {
    this.refreshScenes();
  }

  backButtonClicked() {
    this.back.emit();
  }

  refreshScenes() {
    this.hueService.retrieveAllScenes()
      .then(scenes => this.sceneList = scenes);
    }

  getSceneImage(name: string): string {
    return this.manipulationService.getSceneImage(name);
  }

  changeScene(sceneData: Scene, id: number) {
    this.hueService.toggleGroup(false, id)
      .then(() => this.hueService.setSceneState(sceneData, id));
    }

}
