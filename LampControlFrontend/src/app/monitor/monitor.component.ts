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
  timer: Subscription;

  constructor(private wienerlinien: WienerlinienService) { }

  ngOnInit() {
    this.timer = timer(0, 10000).subscribe(() => this.refreshAll());
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
    this.departures = monitors.map(monitor => monitor.lines[0].departures.departure);
  }

}
