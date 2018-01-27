/* This is a component ( Smart component ) 
 This is used to get the data using the service from the host
  */

  import { Component, OnInit, OnChanges } from '@angular/core' //Import component 
  import { error } from 'selenium-webdriver';
  import {Router} from '@angular/router'
  import {FormGroup , FormControl , FormArray , FormBuilder , Validators} from '@angular/forms' // Import forms for reactive forms
  import {Observable} from 'rxjs/Observable'
  import 'rxjs/add/observable/forkJoin'

  //amc chart service
  import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
  
  @Component({
      selector: 'chart-container-component', // Selector is used on the pages to display what ever is in the template
      template: `
      <!--<ul class="nav nav-pills">
        <li class="nav-item" >
                <a class="nav-link"
                        routerLinkActive="active"  routerLink="/charts_and_maps_am/chart_am">Bar Chart</a>
        </li>
        <li class="nav-item">
                <a class="nav-link"
                     routerLinkActive="active" routerLink="/charts_and_maps_am/map_am">Map</a>
        </li>
      </ul>

      <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" href="#profile" role="tab" data-toggle="tab" 
                routerLinkActive="active"  routerLink="/charts_and_maps_am/chart_am">Bar Chart</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#buzz" role="tab" data-toggle="tab"  
                routerLinkActive="active" routerLink="/charts_and_maps_am/map_am">Map</a>
        </li>
      </ul>

        <!-- Tab panes -->
        <!--<div class="tab-content">
            <div role="tabpanel" class="tab-pane fade in active" id="profile">
                <map-chart-component></map-chart-component>
            </div>
            <div role="tabpanel" class="tab-pane fade" id="buzz">
                <bar-chart-component></bar-chart-component>
            </div>
        </div>-->

  <ul class="nav nav-tabs" role="tablist">
    <li class="nav-item">
        <a class="nav-link active" href="#amMap" role="tab" data-toggle="tab">Maps</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="#amBarChart" role="tab" data-toggle="tab">Chart (Bar) </a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="#amPieChart" role="tab" data-toggle="tab">Chart (Pie)</a>
    </li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
  <div role="tabpanel" class="tab-pane  active chart-top-buffer" id="amMap"><map-chart-component></map-chart-component></div>
  <div role="tabpanel" class="tab-pane fade chart-top-buffer" id="amBarChart"><bar-chart-component></bar-chart-component></div>
  <div role="tabpanel" class="tab-pane fade chart-top-buffer" id="amPieChart"><pie-chart-component></pie-chart-component></div>
</div>

      

      

        
      `
  
  })
  
  export class ChartsContainerComponent { // Export the component

    loadChartComponent() {
        console.log("loadChartComponent")
    }

    loadMapComponent() {
        console.log("loadMapComponent")
    }
    
  }