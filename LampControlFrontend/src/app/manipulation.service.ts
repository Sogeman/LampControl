import { Injectable } from '@angular/core';
import { Light, Group } from './hue.service';

@Injectable({
  providedIn: 'root'
})
export class ManipulationService {

  constructor() { }

  getBrightnessFromRgbString(rgbString: string): number {
    const substring = rgbString.substring(4, rgbString.length - 1);
    const replacedsubstring = substring.replace('(', '');
    return parseFloat(replacedsubstring.split(',')[3]);
  }

  getNumbersFromRgbString(rgbString: string): string[] {
    const substring = rgbString.substring(4, rgbString.length - 1);
    return substring.replace('(', '').split(',');
  }


  // calculations aren't perfect and values drift if you send the same one multiple times but it's the best I can do
  convertRGBtoXY(color: string[]): string[] {
    let red = parseInt(color[0], 10) / 255;
    let green = parseInt(color[1], 10) / 255;
    let blue = parseInt(color[2], 10) / 255;

    red = (red > 0.04045) ? Math.pow((red + 0.055) / (1.0 + 0.055), 2.4) : (red / 12.92);
    green = (green > 0.04045) ? Math.pow((green + 0.055) / (1.0 + 0.055), 2.4) : (green / 12.92);
    blue = (blue > 0.04045) ? Math.pow((blue + 0.055) / (1.0 + 0.055), 2.4) : (blue / 12.92);

    const X = red * 0.649926 + green * 0.103455 + blue * 0.197109;
    const Y = red * 0.234327 + green * 0.743075 + blue * 0.022598;
    const Z = red * 0.0000000 + green * 0.053077 + blue * 1.035763;

    const x = X / (X + Y + Z);
    const y = Y / (X + Y + Z);
    return [x.toPrecision(4), y.toPrecision(4)];
  }

  convertXYtoRGB(color: number[]): number[] {
    const x = color[0];
    const y = color[1];
    const z = 1.0 - x - y;
    const Y = 1.0; // brightness
    const X = (Y / y) * x;
    const Z = (Y / y) * z;
    let r = X * 1.612 - Y * 0.203 - Z * 0.302;
    let g = -X * 0.509 + Y * 1.412 + Z * 0.066;
    let b = X * 0.026 - Y * 0.072 + Z * 0.962;
    r = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, (1.0 / 2.4)) - 0.055;
    g = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, (1.0 / 2.4)) - 0.055;
    b = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, (1.0 / 2.4)) - 0.055;
    const maxValue = Math.max(r, g, b);
    r /= maxValue;
    g /= maxValue;
    b /= maxValue;
    r = Math.round(r * 255); if (r < 0) { r = 0; } // if below 0, set to 0 because it's white
    g = Math.round(g * 255); if (g < 0) { g = 0; }
    b = Math.round(b * 255); if (b < 0) { b = 0; }

    return [r, g, b];
  }

  calculateLightState(light: Light, group: Group) {
    let bri = 0;
    let rgb = [];
    let lightState = '';
    let alpha = ',';
    if (light) {
      bri = light.state.bri;
      rgb = this.convertXYtoRGB(light.state.xy);
    } else {
      bri = group.action.bri;
      rgb = this.convertXYtoRGB(group.action.xy);
    }
    if (bri === 1) {
      bri = 0;
      alpha += bri.toString();
    } else if (bri === 254) {
      bri = 1;
      alpha = '';
    } else {
      bri = parseFloat((bri / 254).toFixed(2));
      alpha += bri.toString();
    }
    lightState = `rgb(${rgb[0]},${rgb[1]},${rgb[2]}${alpha})`;
    return lightState;
  }

  calculateChangeLightState(state: string) {
    const splitColor = this.getNumbersFromRgbString(state);
    const xyColor = this.convertRGBtoXY(splitColor);
    let brightness = Math.trunc(this.getBrightnessFromRgbString(state) * 254);
    if (isNaN(brightness)) {
      brightness = 254;
    } else if (brightness === 0) {
      brightness = 1;
    }
    return { xy: xyColor, bri: brightness };
  }

  getClassImage(roomClass: string, state: string): string {
    switch (roomClass) {
      case 'Bedroom':
        return 'assets/bedroom_' + state + '.svg';
      case 'Bathroom':
        return 'assets/bathroom_' + state + '.svg';
      case 'Living room':
        return 'assets/livingroom_' + state + '.svg';
      case 'Dining': case 'Kitchen':
        return 'assets/kitchen_' + state + '.svg';
      case 'Office':
        return 'assets/office_' + state + '.svg';
      case 'Hallway':
        return 'assets/hallway_' + state + '.svg';
      case 'Toilet':
        return 'assets/toilet_' + state + '.svg';
      case 'Garden': case 'Terrace':
        return 'assets/garden_' + state + '.svg';
      default:
        return 'assets/light_' + state + '.svg';
    }
  }

  getSceneImage(name: string): string {
    switch (name) {
      case 'Sonnenaufgang':
        return 'assets/sunrise.jpg';
      case 'Sonnenuntergang':
        return 'assets/sunset.jpg';
      case 'Lesen':
        return 'assets/reading.jpg';
      case 'Entspannen':
        return 'assets/relax.jpg';
      case 'Energie':
        return 'assets/energy.jpg';
      case 'Sakura':
        return 'assets/sakura.jpg';
      case 'Gemütlich':
        return 'assets/cozy.jpg';
      case 'Nachtlicht':
        return 'assets/nightlight.jpg';
      default:
        return 'assets/default.png';
    }
  }

  createToggleBody(state: boolean) {
    const body = {
      on: !state
    };
    return body;
  }

  createStateBody(color: string[], brightness: number) {
    const x = parseFloat(color[0]);
    const y = parseFloat(color[1]);
    const body = {
      'xy': [
        x,
        y
      ],
      bri: brightness
    };
    return body;
  }

  createGroupAttributeBody(name: string, lights: number[], roomClass: string): any {
    const group = {
      name: name,
      lights: lights
    };
    if (roomClass !== 'group') {
      group['type'] = 'Room';
      group['class'] = roomClass;
    }
    return group;
  }

  createSceneBody(name: string, color: string): any {
    const lightState = this.calculateChangeLightState(color);
    const x = lightState.xy[0];
    const y = lightState.xy[1];
    const bri = lightState.bri;
    const body = {
      name: name,
      x: x,
      y: y,
      brightness: bri,
      rgb: color,
      defaultScene: false
    };
    return body;
  }

}
