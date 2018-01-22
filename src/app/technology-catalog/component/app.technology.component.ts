/* This is a component ( Dumb component ) 
 This is used to render the data on to the UI and listen any changes and emit the changes
  */

  import {Component,Input,Output,EventEmitter} from '@angular/core' //Import component 
  import {FormGroup , FormControl , FormArray} from '@angular/forms' // Import forms for reactive forms
  
  @Component({
      selector:'technology-selector', // Selector is used on the pages to display what ever is in the template
      styleUrls:['../styles/app.technology.scss'],
      template: `
        <div style="color:green;margin-bottom:9px;margin-top:9px;"> This is Form group array </div> 
        <div [formGroup] = "techArraySelector">
            <div formArrayName="technologyItems">
            <div class="border-class">  
                <div *ngFor="let technology of technologiesArray; let i = index"> 
                    <div [formGroupName] = "i">
                        <!-- Form -->                   
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <label for="techNameLabel" class="col-sm-1 col-form-label">ID:</label>
                                    <input type="number" class="form-control  is-valid" formControlName="id" id="techName" placeholder="Enter ID" required>
                                </div>
                                <div class="col-sm-2">
                                    <label for="techNameLabel" class="col-sm-1 col-form-label">Name:</label>
                                    <input type="text" class="form-control  is-valid" formControlName="techName" id="techName" placeholder="Enter Technology Name" required>
                                </div>
                                
                                <div class="col-sm-2 row">
                                    <label for="techDurationLabel" class="col-sm-1 col-form-label">Duration:</label>
                                    <input type="number" class="form-control" formControlName="techDuration" id="techDuration" placeholder="Enter Technology Duration">
                                </div>
                                
                                <div class="col-sm-2 ">
                                    <label for="techPriceLabel" class="col-sm-1 col-form-label">Price:</label>
                                    <input type="number" class="form-control" formControlName="techCost" id="techCost" placeholder="Enter Technology Price">
                                </div>
                                <div class="col-sm-1">
                                    <label class="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0">
                                        <input type="checkbox" class="custom-control-input" formControlName="techOnlineTraining" >
                                        <span class="custom-control-indicator"></span>
                                        <span class="custom-control-description">Online?</span>
                                    </label>
                                </div>
                                
                                <div class="col-sm-2">
                                    <label for="techNameLabel" class="col-sm-1 col-form-label">Start&nbsp;Date:</label>
                                    <input type="date" class="form-control" formControlName="techstartDate" value="techstartDate" id="techstartDate" placeholder="Enter Technology Start Date">
                                </div>
                                <div class="col-sm-1">
                                    <button type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="bottom" (click)="removeTech(i,technology)"  title="Remove a technology">X</button>
                                    <button class="btn btn-primary" (click)="addToCart(i,technology)"  title="Add a technology to cart"> (+) Cart </button>
                                </div>
                            </div>
                        <!-- //Form -->    
                        
                    </div>
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
    //Remove
    @Output() onRemoveTech : EventEmitter<any> = new EventEmitter<any>();
    //Add to cart
    @Output() onAddTechToCart : EventEmitter<any> = new EventEmitter<any>();

    ngOnInit() {
       // console.log('IN tech component');
    }
    // Way to get the form arry from the model group
    get technologiesArray() {
        //const technologiesArray = this.techArraySelector.get('technologies') as FormArray;
        //Fetching from the Service
        const technologiesArray = this.techArraySelector.get('technologyItems') as FormArray;
        if(technologiesArray != null) {
            return technologiesArray.controls;
        } else {
            return [];
        }
    }

    removeTech(index,item) {
        this.onRemoveTech.emit(item);
    }

    addToCart(index,item) {
        //console.log(item);
        this.onAddTechToCart.emit(item);
    }
  }