import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ManipulationService } from './manipulation.service';

export class Light {
  name: string;
  state: {
    bri: number;
    on: boolean;
    xy: number[];
  };
}

export class Group {
  name: string;
  lights: number[];
  type: string; // 'Room'
  class: string; // Room name
  action: {
    on: boolean,
    bri: number,
    xy: number[]
  };
}

export class Scene {
  name: string;
  brightness: number;
  x: number;
  y: number;
}

const HUE_SCENE_RESOURCE_URL = 'http://localhost:8080/lampcontroller/resources/scenes';
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
    return this.httpClient.get('https://www.meethue.com/api/nupnp').toPromise()
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
    if (type === 'groups') {
      return this.httpClient.put(
        localStorage.getItem('bridgeIp') + '/api/' + localStorage.getItem('username') + '/' + type + '/' + id + '/action',
        this.manipulationService.createStateBody(color, brightness))
          .toPromise();
    } else {
      return this.httpClient.put(
        localStorage.getItem('bridgeIp') + '/api/' + localStorage.getItem('username') + '/' + type + '/' + id + '/state',
        this.manipulationService.createStateBody(color, brightness))
          .toPromise();
    }
  }

  deleteEntity(id: number, type: string): Promise<any> {
    return this.httpClient.delete(
      localStorage.getItem('bridgeIp') + '/api/' + localStorage.getItem('username') + '/' + type + '/' + id)
        .toPromise();
  }

  // Lights

  retrieveAllLights(): Promise<Light[]> {
    return this.httpClient.get<Light[]>(
      localStorage.getItem('bridgeIp') + '/api/' + localStorage.getItem('username') + '/lights')
        .toPromise();
  }

  retrieveSingleLight(id: number): Promise<Light> {
    return this.httpClient.get<Light>(
      localStorage.getItem('bridgeIp') + '/api/' + localStorage.getItem('username') + '/lights/' + id)
        .toPromise();
  }

  toggleLight(lightState: boolean, id: number): Promise<any> {
      return this.httpClient.put(
        localStorage.getItem('bridgeIp') + '/api/'
        + localStorage.getItem('username') + '/lights/' + id + '/state', this.manipulationService.createToggleBody(lightState))
          .toPromise();
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
      + localStorage.getItem('username') + '/groups/' + id + '/action', this.manipulationService.createToggleBody(groupState))
        .toPromise();
  }

  retrieveSingleGroup(id: number): Promise<Group> {
    return this.httpClient.get<Group>(
      localStorage.getItem('bridgeIp') + '/api/' + localStorage.getItem('username') + '/groups/' + id)
        .toPromise();
  }

  createGroup(body: any): Promise<any> {
    return this.httpClient.post(
      localStorage.getItem('bridgeIp') + '/api/' + localStorage.getItem('username') + '/groups', body)
        .toPromise();
  }

  setGroupAttributes(body: any, id: number): Promise<any> {
    return this.httpClient.put(
      localStorage.getItem('bridgeIp') + '/api/' + localStorage.getItem('username') + '/groups/' + id, body)
        .toPromise();
  }

  // Scenes

  retrieveAllScenes(): Promise<Scene[]> {
    return this.httpClient.get<Scene[]>(HUE_SCENE_RESOURCE_URL).toPromise();
  }

  setSceneState(sceneData: Scene, id: number): Promise<any> {
    return this.updateState('groups', [sceneData.x.toString(), sceneData.y.toString()], sceneData.brightness, id);
  }

}
