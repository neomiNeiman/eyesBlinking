import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { OpenWebService } from '../open-web.service';
import * as faceapi from 'face-api.js';
import { from, Observable } from 'rxjs';
import { formatNumber } from '@angular/common';
import { IblinkPoint } from 'src/app/iblink-point';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-open-web-cam',
  templateUrl: './open-web-cam.component.html',
  styleUrls: ['./open-web-cam.component.scss']
})

export class OpenWebCamComponent implements OnInit {

  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('video') video: ElementRef;
  blinkLeft: number;
  blinkRight: number;
  blinkCounter = 0;
  startDate = new Date();
  endDate = new Date();
  time = '00:00:00';
  blinksPointArr: IblinkPoint[] = [{ startDate: this.startDate, endDate: this.endDate, blinkCounter: 0 }];
  timeCounter = 0;
  message = 'time to work!';
  blinkTimeArry: Date[] = [new Date()];
  i = 0;
  audio = new Audio();
  flag = 0;
  dateFallAsleep = '';
  flagWakeUp = 0;
  flagBlinking = 0;
  countStart = 0;
  startAvgDate = new Date();

  constructor(private openWebService: OpenWebService) {
    OpenWebService.loadModels();
  }

  private _isActive: boolean;

  get isActive() {
    return this._isActive;
  }

  @Input() set isActive(value: boolean) {

    // if (!value) {
    //   this.goToGraphs();
    // } else if (!this._isActive) {
    //   this.startVideo(this.video.nativeElement);
    //   this.drawFace(this.video.nativeElement);
    // }
    // this._isActive = value;

  }

  ngOnInit() {
    this.videoInit();
  }

  public videoInit() {
    this.startVideo(this.video.nativeElement);
    this.drawFace(this.video.nativeElement);
  }

  stopVideo(video: HTMLVideoElement) {
    video.srcObject = null;
  }

  public startVideo(video: HTMLVideoElement) {
    const constraints = { video: true };
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      video.srcObject = stream;
    });
  }

  private drawFace(video: HTMLVideoElement) {

    const canvas = this.canvas.nativeElement;
    const context = canvas.getContext('2d');

    const displaySize = { width: video.width, height: video.height };
    const f = faceapi.matchDimensions(canvas, displaySize);
    setInterval(async () => {
      if (this.flagWakeUp === 0) {
        const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks();
        if (!detections) {
             return;
          }
        const leftEye = detections.landmarks.getLeftEye();
        const rightEye = detections.landmarks.getRightEye();
        this.detectEyeBlink(leftEye, rightEye);
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        const date = new Date();
        if (date.getMinutes() - this.startDate.getMinutes() > 0) {
          // if (date.getHours() - this.startDate.getHours() >= 1) {
          this.resetCounters();
          // }
        }
      }
    }, 100);
  }

  private detectEyeBlink(leftEye: any[], rightEye: any[]) {
    this.blinkLeft = OpenWebService.findBlinking(leftEye);
    this.blinkRight = OpenWebService.findBlinking(rightEye);
    if (this.blinkLeft < 0.3 && this.blinkRight < 0.3) {
      this.blinkCounter++;
      const blinkDate = new Date();
      this.blinkTimeArry.push(blinkDate);
      const l = this.blinkTimeArry.length;
      const prevTime = this.blinkTimeArry[l - 2].getSeconds();
      const crntDate = this.blinkTimeArry[l - 1].getSeconds();
    //  const start = this.blinkTimeArry[0].getSeconds();
      const start = this.startAvgDate.getSeconds();
      const timeStart = Math.abs(crntDate - start);
      const diffTime = Math.abs(crntDate - prevTime);
      if (this.flagBlinking === 0) {
      if (timeStart <= 20) {
      //  if ( this.flagBlinking === 0) {
          this.countStart++;
        } else {
          this.flagBlinking = 1;
        }
      } else {
      if (diffTime <= 20) {
         // this.flagBlinking = 1;
          this.timeCounter++;
          if (this.timeCounter > this.countStart) {
            this.message = 'please go to sleep :)';
            if (this.flag === 0) {
              this.playAudio();
              this.flag = 1;
         //   }
            }
          }
        }
      }
    }
  }
  private resetCounters() {
    if ((this.blinkCounter > 150) || (this.blinkCounter < 1)) {
      this.message = 'You fall asleep at: ';
      if ( this.startDate.getMinutes() / 10 < 1) {
        this.dateFallAsleep = this.startDate.getHours().toString() + ':0' +
        this.startDate.getMinutes().toString();
      } else {
        this.dateFallAsleep = this.startDate.getHours().toString() + ':' +
        this.startDate.getMinutes().toString();
      }
      this.flagWakeUp = 1;
      this.blinkCounter = 200;
      this.stopVideo(this.video.nativeElement);
    }
    this.blinksPointArr[this.i].blinkCounter = this.blinkCounter;
    this.blinksPointArr[this.i].endDate = new Date();
    this.blinksPointArr.push({ startDate: new Date(), endDate: new Date(), blinkCounter: 0 });
    this.startDate = new Date();
    this.blinkCounter = 0;
    this.timeCounter = 0;
    this.i++;
  }

  playAudio() {
    this.audio.src = '../../../assets/מכתב לאחי - צלצול.mp3';
    this.audio.load();
    this.audio.play();
  }

  goToGraphs() {
    this.openWebService.setBlinksData(this.blinksPointArr);
    this.stopToSing();
    this.stopVideo(this.video.nativeElement);
  }

  stopToSing() {
    this.audio.pause();
    this.timeCounter = 0;
    this.flag = 0;
    this.message = 'You woke up again....';
  }

  goToWakeUp() {
    this.flagWakeUp = 0;
    this.message = 'You woke up again....';
    this.videoInit();
  }

 // getVideoElement() {
 //   return;
 // }
}
