import { Component, OnInit, OnDestroy } from '@angular/core';
import { WienerlinienService } from '../wienerlinien.service';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {

  monitorsData: any;
  departures: Array<any>;
  departures1: Array<any>;
  departures2: Array<any>;
  departures3: Array<any>;
  departures4: Array<any>;
  timer: Subscription;

  constructor(private wienerlinien: WienerlinienService) { }

  ngOnInit() {
    this.timer = timer(0, 30000).subscribe(() => this.refreshAll());
  }

  // ngOnDestroy() {
  //   this.timer.unsubscribe();
  // }

  refreshAll() {
    this.wienerlinien.getStationInfo()
      .subscribe(response => this.monitorsData = response.data.monitors)
      .add(() => this.createDeparturesArray(this.monitorsData));



      // .add(() => this.departures1 = this.monitorsData[0].lines[0].departures.departure)
      // .add(() => this.departures2 = this.monitorsData[1].lines[0].departures.departure)
      // .add(() => this.departures3 = this.monitorsData[2].lines[0].departures.departure)
      // .add(() => this.departures4 = this.monitorsData[3].lines[0].departures.departure);

  }

  createDeparturesArray(monitors: Array<any>) {
    const departures = [];
    monitors.forEach(monitor => departures.push(monitor.lines[0].departures.departure));
    this.departures = departures;
    console.log(this.departures);
  }

}
