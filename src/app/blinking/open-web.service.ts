import {Injectable} from '@angular/core';
import {BlinkingModule} from './blinking.module';

import * as faceapi from 'face-api.js';
import { IblinkPoint } from '../iblink-point';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: BlinkingModule
})
export class OpenWebService {

  blinks: IblinkPoint[];

  blinksObservable: BehaviorSubject<IblinkPoint[]> = new BehaviorSubject(null);
  constructor() {
  }

  static async loadModels() {
    await faceapi.nets.tinyFaceDetector.loadFromUri('assets/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('assets/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('assets/models');
  }

  static findBlinking(Eye) {
    const p1 = Eye[0];
    const p2 = Eye[1];
    const p3 = Eye[2];
    const p4 = Eye[3];
    const p5 = Eye[4];
    const p6 = Eye[5];
    let a = ((p2.x - p6.x) * (p2.x - p6.x)) + ((p2.y - p6.y) * (p2.y - p6.y));
    a = Math.sqrt(a);
    let b = ((p3.x - p5.x) * (p3.x - p5.x)) + ((p3.y - p5.y) * (p3.y - p5.y));
    b = Math.sqrt(b);
    let c = ((p1.x - p4.x) * (p1.x - p4.x)) + ((p1.y - p4.y) * (p1.y - p4.y));
    c = Math.sqrt(c);
    const blink = (a + b) / (2 * c);
    return blink;
  }

  setBlinksData(blinks: IblinkPoint[]) {
    this.blinks = blinks;
    this.blinksObservable.next(blinks);
  }

  getBlinkData(): Observable<IblinkPoint[]> {
  return this.blinksObservable;
  }
}


