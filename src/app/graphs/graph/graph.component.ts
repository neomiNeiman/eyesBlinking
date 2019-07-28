import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { IblinkPoint } from 'src/app/iblink-point';
import { OpenWebService } from 'src/app/blinking/open-web.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  width: string;
  height: string;
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public chartColors: Array<any> = [
    {
      higth: '70%',
      backgroundColor: '#3f51b5',
      borderColor: '#3f51b5',
      hoverBackgroundColor: '#FF0',
      hoverBorderColor: '#00F',
      borderWidth: 2,
    }
  ];

  public barChartData: ChartDataSets[];
  public barChartLabels: Label[];
  date = 'null';

  @Input() blinks: IblinkPoint[];
  constructor(private openWebService: OpenWebService) {
    this.width = '400';
    this.height = '140';
  }

  ngOnInit() { // get the data from the servise (by observble)
    this.openWebService.getBlinkData().subscribe(arrBlinks => {
      if (!arrBlinks) {
        return;
      }
      const startDateArry: any[] = [];
      const blinkArry: any[] = [];
      arrBlinks.forEach(element => {
      blinkArry.push(element.blinkCounter).toString();

      if (element.startDate.getMinutes() / 10 < 1 ) {
        this.date = element.startDate.getHours().toString() + ':0' +
        element.startDate.getMinutes().toString();
      } else {
        this.date = element.startDate.getHours().toString() + ':' +
        element.startDate.getMinutes().toString();
      }

      if (element.blinkCounter === 200) {
          startDateArry.push('You Fall Asleep at: ' + this.date);
      } else {
       startDateArry.push(this.date); // push the data to graph
      }
      });
      this.barChartLabels = startDateArry; // show the data on graph
      this.barChartData = [{ data: blinkArry, label: 'blinks'}];
    });

  }
}
