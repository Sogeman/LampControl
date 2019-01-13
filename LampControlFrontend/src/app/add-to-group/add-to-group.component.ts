import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { HueService } from '../hue.service';
import { Light, Group } from '../detail/detail.component';
import { ManipulationService } from '../manipulation.service';

@Component({
  selector: 'app-add-to-group',
  templateUrl: './add-to-group.component.html',
  styleUrls: ['./add-to-group.component.css']
})
export class AddToGroupComponent implements OnInit {

  @Output() back = new EventEmitter();
  @Output() createGroup = new EventEmitter();
  @Input() selectedGroup: Group;
  @Input() groupCreation: boolean;
  lightList: Light[];
  selectedRoomClass: string;
  selectedLights: Array<any> = [];
  groupName: string;

  constructor(private hueService: HueService, private manipulationService: ManipulationService) { }

  ngOnInit() {
    this.hueService.retrieveAllLights()
      .then(lights => this.lightList = lights);
  }

  backButtonClicked() {
    this.back.emit();
  }

  onChange(id: number, isChecked: boolean) {
    if (isChecked) {
      this.selectedLights.push(id);
    } else {
      const index = this.selectedLights.indexOf(id);
      this.selectedLights.splice(index, 1);
    }
  }

  startGroupCreation(name: string, lights: number[], roomClass: string) {
    this.createGroup.emit(this.manipulationService.createGroupCreationBody(name, lights, roomClass));
  }

  startSavingGroup(lights: number[]) {

  }

}
