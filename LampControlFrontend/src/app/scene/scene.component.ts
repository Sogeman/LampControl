import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements OnInit {

  @Output() back = new EventEmitter();

  constructor() { }

  ngOnInit() {
    // fetch all scenes from backend
  }

  backButtonClicked() {
    this.back.emit();
  }

}
