import {Component,Input,Output,EventEmitter} from '@angular/core' //Import component 
import {FormGroup , FormControl , FormArray} from '@angular/forms' // Import forms for reactive forms

@Component({
    selector:'technology-add', // Selector is used on the pages to display what ever is in the template
    styleUrls:['../styles/app.technology.scss'],
    template: `
    <div [formGroup] = "techSelector" > 
            <div class="border-class">                    
                <div class="form-group row">
                
                    <div class="col-sm-1">
                        <label for="techNameLabel" class="col-sm-1 col-form-label">ID:</label>
                        <input type="number" class="form-control" formControlName="id" id="id" placeholder="Enter ID"  required>
                        <div class="text-danger" *ngIf="checkRequired('id')">ID is Required</div>
                    </div>
                    <div class="col-sm-2">
                        <label for="techNameLabel" class="col-sm-1 col-form-label">Name:</label>
                        <input type="text" class="form-control is-invalid" formControlName="techName" id="techName" placeholder="Enter Technology Name" required>
                        <div class="text-danger" *ngIf="checkRequired('techName')">Tech Name is Required</div>
                    </div>
                    
                    <div class="col-sm-2 row">
                        <label for="techDurationLabel" class="col-sm-1 col-form-label">Duration:</label>
                        <input type="number" class="form-control" formControlName="techDuration" id="techDuration" placeholder="Enter Technology Duration"  required>
                        <div class="text-danger" *ngIf="checkRequired('techDuration')">Duration is Required</div>
                    </div>
                    
                    <div class="col-sm-2 ">
                        <label for="techPriceLabel" class="col-sm-1 col-form-label">Price:</label>
                        <input type="number" class="form-control" formControlName="techCost" id="techCost" placeholder="Enter Technology Price"  required>
                        <div class="text-danger" *ngIf="checkRequired('techCost')">Price is Required</div>
                        <div class="text-danger" *ngIf="invalidPrice">Price should be greater than 100</div>
                        
                        
                    </div>                    
                    
                    <div class="col-sm-1">
                        <div class="form-check">
                            <label class="form-check-label" for="gridCheck1">Online?</label>
                            <input class="form-check-input" formControlName="techOnlineTraining" type="checkbox" >
                        </div>
                    </div>
                    
                    <div class="col-sm-2 ">
                        <label for="techNameLabel" class="col-sm-1 col-form-label">Start&nbsp;Date:</label>
                        <input type="date" class="form-control" formControlName="techstartDate" value="techstartDate" id="techstartDate" placeholder="Enter Technology Start Date"  required>
                        <div class="text-danger" *ngIf="checkRequired('techstartDate')">Start Date is Required</div>
                    </div>
                    <div class="col-sm-2">
                        <button class="btn btn-primary" type="submit" [disabled] ="techSelector.invalid" (click)="addTech()" title="Add a New technology">Add technology</button>
                    </div>
                </div>
                

                <!--<pre>
                {{techSelector.valid | json}}
                {{techSelector.invalid === false}}
            </pre> -->
            </div>
        </div>   
    `

})

export class TechnologyAddComponent { // Export the component


    // Single Form group
    @Output() onTechAdd: EventEmitter<any> = new EventEmitter<any>();

    @Input() techSelector : FormGroup; 
    
    ngOnInit() {
        //console.log("Init");
        this.techSelector.reset();
    }

    addTech(){
        this.onTechAdd.emit(this.techSelector.value);
    }

    checkRequired(field) {
        return this.techSelector.get(field).hasError('required')
            && this.techSelector.get(field).dirty; 
    }

    get invalidPrice() {
        return this.techSelector.get('techCost').hasError("invalidTechPrice")
            && this.techSelector.get('techCost').dirty
            && !this.checkRequired('techCost');
    }


}