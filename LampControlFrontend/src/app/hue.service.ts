import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Room {
  name: string;
  type: string; // "Room"
  class: string; // "Living Room etc"
  lights: string[];
}

const HUE_SCENE_RESOURCE_URL = 'https://localhost:8080/lampcontroller/resources/scenes';
// let HUE_API_CREATE_USER_URL = '';

@Injectable({
  providedIn: 'root'
})
export class HueService {

  room: Room;

  constructor(private httpClient: HttpClient) { }

  createUser(bridgeIp: string): Promise<any> {
    return this.httpClient.post('http://' + bridgeIp + '/api', { 'devicetype': 'my_hue_app_lampcontroller' }).toPromise();
  }

  retrieveRoom(id: number) {
    return 2;
    // return this.httpClient.get<Room>();
  }

  fetchBridgeList(): Promise<any> {
    return this.httpClient.get('https://discovery.meethue.com').toPromise();
  }
}
