import { Component, OnInit, OnDestroy } from '@angular/core';
import { WienerlinienService } from '../wienerlinien.service';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit, OnDestroy {

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

  ngOnDestroy() {
    this.timer.unsubscribe();
  }

  refreshAll() {
    this.wienerlinien.getStationInfo()
      .subscribe(response => this.monitorsData = response.data.monitors)
      .add(() => this.createDeparturesArray(this.monitorsData));
  }

  createDeparturesArray(monitors: Array<any>) {
    const departures = [];
    monitors.forEach(monitor => departures.push(monitor.lines[0].departures.departure));
    this.departures = departures;
    console.log(this.departures);
  }

}
