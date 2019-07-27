import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { OpenWebCamComponent } from '../blinking/open-web-cam/open-web-cam.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(private cdRef: ChangeDetectorRef) { }

  activeTab: string;

  @ViewChild('webCam') webCam: OpenWebCamComponent;
  selectedTabChange(evt) {
    if (evt.index === 1) {
      this.webCam.goToGraphs();
    } else {
      this.webCam.videoInit();
    }
  }
  setActive(active: string) {
    if (active === 'graph') {
      this.webCam.goToGraphs();
    } else {
      this.webCam.videoInit();
    }
  }
  ngOnInit() {
  }

}
