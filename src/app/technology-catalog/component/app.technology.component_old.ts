/* This is a component ( Dumb component ) 
 This is used to render the data on to the UI and listen any changes and emit the changes
  */

  import {Component,Input} from '@angular/core' //Import component 
  import {FormGroup , FormControl , FormArray} from '@angular/forms' // Import forms for reactive forms
  
  @Component({
      selector:'technology-selector', // Selector is used on the pages to display what ever is in the template
      styleUrls:['../styles/app.technology.scss'],
      template: `
        <div style="background-color:#23527C;">
            <div style="color:red;margin-bottom:9px;"> This is boot strap (Work on Validations) : Create a dialog box for note </div> 
            <div style="color:green;margin-bottom:9px;"> Thers is  a Single Form ( Commented in the code [app.technology.component.ts)]) </div> 
        </div>
        <!--<div [formGroup] = "techSelector"> 
            <div class="form-group row">
                <label for="techNameLabel" class="col-sm-2 col-form-label">Technology Name</label>
                <div class="col-sm-5">
                    <input type="text" class="form-control  is-valid" formControlName="techName" id="techName" placeholder="Enter Technology Name" required>
                </div>
            </div>
            <div class="form-group row">
                <label for="techDurationLabel" class="col-sm-2 col-form-label">Technology Duration (hours)</label>
                <div class="col-sm-5">
                    <input type="text" class="form-control" formControlName="techDuration" id="techDuration" placeholder="Enter Technology Duration">
                </div>
            </div>
            <div class="form-group row">
                <label for="techPriceLabel" class="col-sm-2 col-form-label">Technology Price</label>
                <div class="col-sm-5">
                    <input type="text" class="form-control" formControlName="techCost" id="techCost" placeholder="Enter Technology Price">
                </div>
            </div>
            <div class="form-group row">        
                <label for="techNameLabel" class="col-sm-2 col-form-label">Online Training Available ?</label>
                <div class="col-sm-5">
                    <input class="form-check-input" formControlName="techOnlineTraining" type="checkbox" >
                </div>
            </div>
            <div class="form-group row">
                <label for="techNameLabel" class="col-sm-2 col-form-label">Training start Date</label>
                <div class="col-sm-5">
                    <input type="date" class="form-control" formControlName="techstartDate" value="techstartDate" id="techstartDate" placeholder="Enter Technology Start Date">
                </div>
            </div>
        </div>-->

        <div style="color:green;margin-bottom:9px;margin-top:9px;"> This is Form group array </div> 
        <div [formGroup] = "techArraySelector">
            <div formArrayName="technologies">
                <div *ngFor="let technology of technologiesArray; let i = index"> 
                    <div [formGroupName] = "i">
                        <!-- Form -->  
                        <div class="form-border-class">                    
                            <div class="form-group row">
                                <label for="techNameLabel" class="col-sm-2 col-form-label">Technology Name</label>
                                <div class="col-sm-5">
                                    <input type="text" class="form-control  is-valid" formControlName="techName" id="techName" placeholder="Enter Technology Name" required>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="techDurationLabel" class="col-sm-2 col-form-label">Technology Duration (hours)</label>
                                <div class="col-sm-5">
                                    <input type="text" class="form-control" formControlName="techDuration" id="techDuration" placeholder="Enter Technology Duration">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="techPriceLabel" class="col-sm-2 col-form-label">Technology Price</label>
                                <div class="col-sm-5">
                                    <input type="text" class="form-control" formControlName="techCost" id="techCost" placeholder="Enter Technology Price">
                                </div>
                            </div>
                            <div class="form-group row">        
                                <label for="techNameLabel" class="col-sm-2 col-form-label">Online Training Available ?</label>
                                <div class="col-sm-5">
                                    <input class="form-check-input" formControlName="techOnlineTraining" type="checkbox" >
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="techNameLabel" class="col-sm-2 col-form-label">Training start Date</label>
                                <div class="col-sm-5">
                                    <input type="date" class="form-control" formControlName="techstartDate" value="techstartDate" id="techstartDate" placeholder="Enter Technology Start Date">
                                </div>
                            </div> 
                            
                            <pre> 
                                {{technology.value | json}}
                            </pre> 
                         </div> 
                        <!-- //Form -->    
                        
                    </div>
                </div>
            </div>        
        </div>
          


        

        

  
      `
  
  })
  
  export class TechnologyFormComponent { // Export the component

    // Single Form group
    @Input() techSelector: FormGroup;
    //Multi Form group (Form array)
    @Input() techArraySelector: FormGroup;

    // Way to get the form arry from the model group
    get technologiesArray() {
        const technologiesArray = this.techArraySelector.get('technologies') as FormArray;
        return technologiesArray.controls;
    }
  }