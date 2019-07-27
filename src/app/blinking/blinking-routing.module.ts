import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenWebCamComponent } from './open-web-cam/open-web-cam.component';

const routes: Routes = [
  { path: '', component: OpenWebCamComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlinkingRoutingModule { }
