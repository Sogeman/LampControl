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
  departures1: Array<any>;
  departures2: Array<any>;
  departures3: Array<any>;
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
      .add(() => console.log(this.monitorsData))
      .add(() => this.departures1 = this.monitorsData[0].lines[0].departures.departure)
      .add(() => this.departures2 = this.monitorsData[1].lines[0].departures.departure)
      .add(() => this.departures3 = this.monitorsData[2].lines[0].departures.departure);
  }

}
