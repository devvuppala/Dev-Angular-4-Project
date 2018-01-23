/* This is a component ( Smart component ) 
 This is used to get the data using the service from the host
  */

  import { Component, OnInit, OnChanges } from '@angular/core' //Import component 
  import { error } from 'selenium-webdriver';
  import {Router} from '@angular/router'
  import {FormGroup , FormControl , FormArray , FormBuilder , Validators} from '@angular/forms' // Import forms for reactive forms
  import {Observable} from 'rxjs/Observable'
  import 'rxjs/add/observable/forkJoin'
  import {ReminderState} from '../model/app.reminder.model'
  
  @Component({
      selector: 'reminder-container-component', // Selector is used on the pages to display what ever is in the template
      template: `
        This is reminder component
        
      `
  
  })
  
  export class RemindersComponent { // Export the component

        
      
  }