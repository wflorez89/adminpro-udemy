import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {


   @Input()  doughnutChartData:number[] = [];
   @Input()  doughnutChartType:string = '';
   @Input()  leyenda:string = '';
   @Input() doughnutChartLabels:string[] = [];

  constructor() { }

  ngOnInit() {
    console.log('Labels',this.doughnutChartLabels);
  }

}
