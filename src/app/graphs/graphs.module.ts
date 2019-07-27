import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import { GraphsRoutingModule } from './graphs-routing.module';
import { GraphComponent } from './graph/graph.component';

@NgModule({
  declarations: [GraphComponent],
  imports: [
    CommonModule,
    GraphsRoutingModule,
    ChartsModule
  ]
})
export class GraphsModule { }
