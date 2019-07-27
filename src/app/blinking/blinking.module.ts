import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlinkingRoutingModule } from './blinking-routing.module';
import { OpenWebCamComponent } from './open-web-cam/open-web-cam.component';

@NgModule({
  declarations: [OpenWebCamComponent],
  imports: [
    CommonModule,
    BlinkingRoutingModule,

  ]
})
export class BlinkingModule { }
