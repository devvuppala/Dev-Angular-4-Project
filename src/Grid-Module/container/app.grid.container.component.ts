/* This is a component ( Smart component ) 
 This is used to get the data using the service from the host
  */

  import { Component, OnInit, OnChanges } from '@angular/core' //Import component 
  import { error } from 'selenium-webdriver';
  import {Router} from '@angular/router'
  
  @Component({
      selector: 'grid-module', // Selector is used on the pages to display what ever is in the template
      template: `
        ---------------Grid Module Container Component---------------
      `
  
  })
  
  export class GridModuleComponent { // Export the component
  
      constructor(private router:Router) {
          
      }
  
      //Init method called when the class is initilized
      ngOnInit() {
          console.log("Grid Component");
      }
      
  }