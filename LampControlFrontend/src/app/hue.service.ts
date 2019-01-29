import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ManipulationService } from './manipulation.service';

export class Light {
  name: string;
  state: {
    bri: number;
    on: boolean;
    xy: Array<number>;
  };
}

export class Group {
  name: string;
  lights: Array<number>;
  type: string; // 'Room'
  class: string; // Room name
  action: {
    on: boolean,
    bri: number,
    xy: Array<number>
  };
}

export class Scene {
  id: number;
  name: string;
  brightness: number;
  x: number;
  y: number;
  rgb: string;
  defaultScene: number;
}

const HUE_SCENE_RESOURCE_URL = 'http://192.168.0.117:8080/lampcontroller/resources/scenes'; // für RPi
// const HUE_SCENE_RESOURCE_URL = 'http://192.168.0.129:8080/lampcontroller/resources/scenes';
let hueBridgeUrl = '';

@Injectable({
  providedIn: 'root'
})
export class HueService {

  constructor(private httpClient: HttpClient, private manipulationService: ManipulationService) { }

  // User Creation

  createUser(): Promise<any> {
    return this.httpClient.post(hueBridgeUrl + '/api', { 'devicetype': 'my_hue_app_lightcontroller' })
      .toPromise();
  }

  fetchBridgeUrl(): Promise<string> {
    return this.httpClient.get('https://www.meethue.com/api/nupnp').toPromise()
      // .then((bridgeList => hueBridgeUrl = 'http://' + bridgeList[0].internalipaddress));
      .then((bridgeList => hueBridgeUrl = 'http://' + '192.168.0.115'));
  }

  checkUsername(username: string): Promise<any> {
    return this.httpClient.get(localStorage.getItem('bridgeIp') + '/api/' + username).toPromise();
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

  retrieveAllLights(): Promise<Array<Light>> {
    return this.httpClient.get<Array<Light>>(
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

  retrieveAllGroups(): Promise<Array<Group>> {
    return this.httpClient.get<Array<Group>>(
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

  retrieveAllScenes(): Promise<Array<Scene>> {
    return this.httpClient.get<Array<Scene>>(HUE_SCENE_RESOURCE_URL).toPromise();
  }

  setSceneState(sceneData: Scene, id: number): Promise<any> {
    return this.updateState('groups', [sceneData.x.toString(), sceneData.y.toString()], sceneData.brightness, id);
  }

  saveScene(name: string, color: string, sceneId: number): Promise<any> { // if ob post oder put
    if (sceneId) {
      return this.httpClient.put(HUE_SCENE_RESOURCE_URL + '/' + sceneId, this.manipulationService.createSceneBody(name, color)).toPromise();
    } else {
      return this.httpClient.post(HUE_SCENE_RESOURCE_URL, this.manipulationService.createSceneBody(name, color)).toPromise();
    }
  }

  deleteScene(id: number): Promise<any> {
    return this.httpClient.delete(HUE_SCENE_RESOURCE_URL + '/' + id).toPromise();
  }
}
