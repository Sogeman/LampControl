import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Light, Group } from './detail/detail.component';
import { ManipulationService } from './manipulation.service';

// const HUE_SCENE_RESOURCE_URL = 'https://localhost:8080/lightcontroller/resources/scenes';
let HUE_BRIDGE_URL = '';

@Injectable({
  providedIn: 'root'
})
export class HueService {

  constructor(private httpClient: HttpClient, private manipulationService: ManipulationService) { }

  // User Creation

  createUser(): Promise<any> {
    console.log(HUE_BRIDGE_URL);
    return this.httpClient.post(HUE_BRIDGE_URL + '/api', { 'devicetype': 'my_hue_app_lightcontroller' })
      .toPromise();
  }

  fetchBridgeUrl(): Promise<string> {
    return this.httpClient.get('https://discovery.meethue.com').toPromise()
      .then((bridgeList => HUE_BRIDGE_URL = 'http://' + bridgeList[0].internalipaddress));
  }

  // Lights & Groups

  changeName(value: string, id: number, type: string): Promise<any> {
    const body = {
      'name': value
    };
    if (type === 'group') {
      return this.httpClient.put(
        localStorage.getItem('bridgeIp') + '/api/' + localStorage.getItem('username') + '/groups/' + id, body)
          .toPromise();
    } else {
      return this.httpClient.put(
        localStorage.getItem('bridgeIp') + '/api/' + localStorage.getItem('username') + '/lights/' + id, body)
          .toPromise();
    }

  }

  updateState(type: string, color: string[], brightness: number, id: number) {
    const x = parseFloat(color[0]);
    const y = parseFloat(color[1]);
    const body = {
      'xy': [
        x,
        y
      ],
      bri: brightness
    };
    if (type === 'group') {
      return this.httpClient.put(
        localStorage.getItem('bridgeIp') + '/api/' + localStorage.getItem('username') + '/' + type + '/' + id + '/action', body)
          .toPromise();
    } else {
      return this.httpClient.put(
        localStorage.getItem('bridgeIp') + '/api/' + localStorage.getItem('username') + '/' + type + '/' + id + '/state', body)
          .toPromise();
    }
  }

  deleteEntity(id: number, type: string): Promise<any> {
    return this.httpClient.delete(
      localStorage.getItem('bridgeIp') + '/api/' + localStorage.getItem('username') + '/' + type + '/' + id)
        .toPromise();
  }

  // Lights

  retrieveAllLights(): Promise<Light> {
    return this.httpClient.get<Light>(
      localStorage.getItem('bridgeIp') + '/api/' + localStorage.getItem('username') + '/lights')
        .toPromise();
  }

  retrieveSingleLight(id: number): Promise<Light> {
    return this.httpClient.get<Light>(
      localStorage.getItem('bridgeIp') + '/api/' + localStorage.getItem('username') + '/lights/' + id)
        .toPromise();
  }

  toggleLight(lightState: boolean, id: number): Promise<any> {
    if (lightState) {
      return this.httpClient.put(
        localStorage.getItem('bridgeIp') + '/api/'
        + localStorage.getItem('username') + '/lights/' + id + '/state', this.manipulationService.createStateBody(lightState))
          .toPromise();
    } else {
      return this.httpClient.put(
        localStorage.getItem('bridgeIp') + '/api/'
        + localStorage.getItem('username') + '/lights/' + id + '/state', this.manipulationService.createStateBody(lightState))
          .toPromise();
    }

  }

  searchForNewLights(): Promise<any> {
    return this.httpClient.post(localStorage.getItem('bridgeIp') + '/api/' + localStorage.getItem('username') + '/lights', {})
      .toPromise();
  }

  getNewLights(): Promise<any> {
    return this.httpClient.get(localStorage.getItem('bridgeIp') + '/api/' + localStorage.getItem('username') + '/lights/new')
      .toPromise();
  }


  // Groups

  retrieveAllGroups(): Promise<Group[]> {
    return this.httpClient.get<Group[]>(
      localStorage.getItem('bridgeIp') + '/api/' + localStorage.getItem('username') + '/groups')
        .toPromise();
  }

  toggleGroup(groupState: boolean, id: number): Promise<any> {
    return this.httpClient.put(localStorage.getItem('bridgeIp') + '/api/'
      + localStorage.getItem('username') + '/groups/' + id + '/action', this.manipulationService.createStateBody(groupState))
        .toPromise();
  }

  retrieveSingleGroup(id: number): Promise<Group> {
    return this.httpClient.get<Group>(
      localStorage.getItem('bridgeIp') + '/api/' + localStorage.getItem('username') + '/groups/' + id)
        .toPromise();
  }

}
