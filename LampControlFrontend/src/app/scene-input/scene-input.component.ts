import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HueService } from '../hue.service';

@Component({
  selector: 'app-scene-input',
  templateUrl: './scene-input.component.html',
  styleUrls: ['./scene-input.component.css']
})
export class SceneInputComponent implements OnInit {

  @Output() back = new EventEmitter();
  @Input() sceneColor: string;

  constructor(private hueService: HueService) { }

  ngOnInit() {
  }

  backButtonClicked() {
    this.back.emit();
  }

  saveScene(name: string, color: string) {
    this.hueService.saveScene(name, color)
      .then(() => this.back.emit());
  }
}
