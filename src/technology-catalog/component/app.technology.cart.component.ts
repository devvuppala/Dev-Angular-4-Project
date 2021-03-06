/* This is a component ( Dumb component ) 
 This is used to render the data on to the UI and listen any changes and emit the changes
  */

  import {Component,Input,Output,EventEmitter} from '@angular/core' //Import component 
  import {FormGroup , FormControl , FormArray} from '@angular/forms' // Import forms for reactive forms
  
  @Component({
      selector:'technology-cart-selector', // Selector is used on the pages to display what ever is in the template
      styleUrls:['../styles/app.technology.scss'],
      template: `
        <div style="color:green;margin-bottom:9px;margin-top:9px;"> This is Form group array </div> 
        <div [formGroup] = "techCartArraySelector">
            <div formArrayName="techCartItems">
            <div class="border-class">  
                <div *ngFor="let technology of technologiesCartArray; let i = index"> 
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
                                <div class="col-sm-2 ">
                                    <label for="techPriceLabel" class="col-sm-1 col-form-label">Price:</label>
                                    <input type="number" class="form-control" formControlName="techCost" id="techCost" placeholder="Enter Technology Price">
                                </div>
                                
                                <div class="col-sm-2">
                                    <label for="techNameLabel" class="col-sm-1 col-form-label">Start&nbsp;Date:</label>
                                    <input type="date" class="form-control" formControlName="techstartDate" value="techstartDate" id="techstartDate" placeholder="Enter Technology Start Date">
                                </div>
                                <div class="col-sm-1">
                                    <button type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="bottom" (click)="removeTechFronmCart(i,technology)"  title="Remove a technology">X</button>
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
  
  export class TechnologyCartFormComponent { // Export the component

    //Multi Form group (Form array)
    @Input() techCartArraySelector: FormGroup;
    //Remove
    @Output() onRemoveTechFromCart : EventEmitter<any> = new EventEmitter<any>();

    ngOnInit() {
       // console.log('IN tech component');
    }
    // Way to get the form arry from the model group
    get technologiesCartArray() {
        //Fetching from the Service
        const technologiesCartArray = this.techCartArraySelector.get('techCartItems') as FormArray;
        //console.log("Cart: " , technologiesCartArray);
        if(technologiesCartArray != null) {
            return technologiesCartArray.controls;
        } else {
            return [];
        }
    }

    removeTechFronmCart(index,item) {
        this.onRemoveTechFromCart.emit(item);
    }

  }