import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Room {
  name: string;
  type: string; // "Room"
  class: string; // "Living Room etc"
  lights: string[];
}

const HUE_SCENE_RESOURCE_URL = 'https://localhost:8080/lampcontroller/resources/scenes';
let HUE_BRIDGE_URL = '';
// let HUE_API_CREATE_USER_URL = '';

@Injectable({
  providedIn: 'root'
})
export class HueService {

  room: Room;

  constructor(private httpClient: HttpClient) { }

  createUser(): Promise<any> {
    console.log(HUE_BRIDGE_URL);
    return this.httpClient.post(HUE_BRIDGE_URL + '/api', { 'devicetype': 'my_hue_app_lampcontroller' }).toPromise();
  }

  changeLightName(value: string, id: number): Promise<any> {
    const body = {
      'name': value
    };
    return this.httpClient.put(
      localStorage.getItem('bridgeIp') + '/api/' + localStorage.getItem('username') + '/lights/' + id, body).toPromise();
  }

  retrieveRoom(id: number) {
    return 2;
    // return this.httpClient.get<Room>();
  }

  fetchBridgeUrl(): Promise<string> {
    return this.httpClient.get('https://discovery.meethue.com').toPromise()
      .then((bridgeList => HUE_BRIDGE_URL = 'http://' + bridgeList[0].internalipaddress));
  }

  retrieveAllLights(): Promise<any> {
    return this.httpClient.get(localStorage.getItem('bridgeIp') + '/api/' + localStorage.getItem('username') + '/lights').toPromise();
  }

  toggleLight(lightState: boolean, id: number): Promise<any> {
    const body = {
      'on': !lightState
    };

    if (lightState) {
      return this.httpClient.put(
        localStorage.getItem('bridgeIp') + '/api/' + localStorage.getItem('username') + '/lights/' + id + '/state', body).toPromise();
    } else {
      return this.httpClient.put(
        localStorage.getItem('bridgeIp') + '/api/' + localStorage.getItem('username') + '/lights/' + id + '/state', body).toPromise();
    }

  }
}
