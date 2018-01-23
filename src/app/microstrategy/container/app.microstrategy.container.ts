/* This is a component ( Smart component ) 
 This is used to get the data using the service from the host
  */

  import { Component, OnInit, OnChanges } from '@angular/core' //Import component 
  import { error } from 'selenium-webdriver';
  import {Router} from '@angular/router'
  import {FormGroup , FormControl , FormArray , FormBuilder , Validators} from '@angular/forms' // Import forms for reactive forms
  import {Observable} from 'rxjs/Observable'
  import 'rxjs/add/observable/forkJoin'
  
  @Component({
      selector: 'ms-container-component', // Selector is used on the pages to display what ever is in the template
      styleUrls: ['../style/app.microstrategy.scss'],
      template: `
      <iframe class= "iframe-loader"  style="width: 97vw;height: 89vh;position: relative;border:10px;border-color:green;" src="http://cldcer0iis00622.itservices.sbc.com/MicroStrategy/asp/Main.aspx?evt=2048001&src=Main.aspx.2048001&documentID=5D67D8694406453EC6902DBBB50E8C54&currentViewMedia=1&visMode=0&Server=CLDCER0IIS00622.ITSERVICES.SBC.COM&Project=RANFT_PROJECT_DEV&Port=0&share=1&hiddensections=header,path,dockTop,dockLeft,footer&msrr=ru&msru=ranft_user&valuePromptAnswers=29114" frameborder="100"></iframe>
      <!--<div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
           <iframe class= "iframe-loader"  style="width: 89vw;height: 89vh;position: relative;border:10px;border-color:green;" src="http://cldcer0iis00622.itservices.sbc.com/MicroStrategy/asp/Main.aspx?evt=2048001&src=Main.aspx.2048001&documentID=5D67D8694406453EC6902DBBB50E8C54&currentViewMedia=1&visMode=0&Server=CLDCER0IIS00622.ITSERVICES.SBC.COM&Project=RANFT_PROJECT_DEV&Port=0&share=1&hiddensections=header,path,dockTop,dockLeft,footer&msrr=ru&msru=ranft_user&valuePromptAnswers=29114" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>-->
        
      `
  
  })
  
  export class MicrostategyContainerComponent { // Export the component    
      
  }