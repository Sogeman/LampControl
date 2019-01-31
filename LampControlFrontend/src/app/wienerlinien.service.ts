import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class WLResponse {

}

const WL_MONITOR_URL = 'http://localhost:8080/lampcontroller/resources/wienerlinien';


@Injectable({
  providedIn: 'root'
})
export class WienerlinienService {

  constructor(private httpClient: HttpClient) { }

  // Haltestellen https://data.wien.gv.at/csv/wienerlinien-ogd-haltestellen.csv
  // Steige (für rbl-Nr.) https://data.wien.gv.at/csv/wienerlinien-ogd-steige.csv

  getStationInfo(): Observable<any> { // hardcoded for one station, both directions
    return this.httpClient.get(WL_MONITOR_URL + '/1655/1661');
    // change numbers based on station you want, you get the Data in the csv files
  }

}
