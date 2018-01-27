/* This is a component ( Dumb component ) 
 This is used to render the data on to the UI and listen any changes and emit the changes
  */

  import {Component,Output,EventEmitter} from '@angular/core' //Import component 
  //amc chart service
  import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
  
  @Component({
      selector:'pie-chart-component', // Selector is used on the pages to display what ever is in the template
      template: `
        <div>
            <div id="pieChartdiv" [style.width.%]="100" [style.height.px]="500"></div>
        </div>
  
      `
  
  })
  
  export class PieChartComponent { // Export the component

    private chart: AmChart;
    constructor(private AmCharts: AmChartsService) {

    }

    ngAfterViewInit() {
        this.chart = this.AmCharts.makeChart( "pieChartdiv", {
            "type": "pie",
            "theme": "light",
            "dataProvider": [ {
              "country": "Lithuania",
              "litres": 501.9
            }, {
              "country": "Czech Republic",
              "litres": 301.9
            }, {
              "country": "Ireland",
              "litres": 201.1
            }, {
              "country": "Germany",
              "litres": 165.8
            }, {
              "country": "Australia",
              "litres": 139.9
            }, {
              "country": "Austria",
              "litres": 128.3
            }, {
              "country": "UK",
              "litres": 99
            }, {
              "country": "Belgium",
              "litres": 60
            }, {
              "country": "The Netherlands",
              "litres": 50
            } ],
            "valueField": "litres",
            "titleField": "country",
             "balloon":{
             "fixedPosition":true
            },
            "export": {
              "enabled": true
            }
          } );
    
    }

    ngOnDestroy() {
        if (this.chart) {
          this.AmCharts.destroyChart(this.chart);
        }
      }

}