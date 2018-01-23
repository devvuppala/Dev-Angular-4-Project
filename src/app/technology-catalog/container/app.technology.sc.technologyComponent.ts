/* This is a component ( Smart component ) 
 This is used to get the data using the service from the host
  */

  import { Component, OnInit, OnChanges } from '@angular/core' //Import component 
  import { TechnologyModel , TechnologyCartModel } from '../model/app.technology.model';
  import { error } from 'selenium-webdriver';
  import {Router} from '@angular/router'
  import {FormGroup , FormControl , FormArray , FormBuilder , Validators} from '@angular/forms' // Import forms for reactive forms
  import { TechnologyService } from '../service/app.technology.service';
  import {Observable} from 'rxjs/Observable'
  import 'rxjs/add/observable/forkJoin'
  import {TechnologyValidator} from '../validators/app.technology.validator'
  
  @Component({
      selector: 'tech-catalog', // Selector is used on the pages to display what ever is in the template
      template: `
        <div style="color:red;margin-bottom:9px;font-size:22px;"> Reactive Forms: (Example) </div> 
        <div> 
            <div *ngIf="showSuccessMessage" class="alert alert-success" role="alert">
                {{successOrErrorMessage}}
            </div>
            <div *ngIf="showErrorMessage" class="alert alert-danger" role="alert">
                {{successOrErrorMessage}}
            </div>
            <button class="btn btn-success" (click)="enableTechadd()"> (+) Add Technology</button>           
            <button class="btn btn-success" (click)="disableTechadd()" ng-disabled="!enableTechaddDiv">hide</button>

            <!-- Technology add -->
            <div *ngIf="enableTechaddDiv" style="top-margin:15px;">
                <technology-add (onTechAdd)="onTechnologyAdd($event)"  
                                [techSelector] = "initialAddStore.get('technology')">
                </technology-add>            
            </div>

            <!-- Technology -->
            <form [formGroup]="techologiesFromService"  class="needs-validation" novalidate  style="margin-top:15px;"> 
                <!-- Single form Group -->
                <!-- <technology-selector [techSelector] = "store.get('technology')" ></technology-selector>-->
                <div class="alert alert-warning" role="alert">
                    <strong>Total Cost of Technologies :{{totalCostOfTechs}}</strong>
                </div>
                <!-- Form Array Group -->
                 <technology-selector 
                    [techArraySelector] = "techologiesFromService" 
                    (onRemoveTech)="deleteTech($event)" 
                    (onAddTechToCart)="addTechnologyToCart($event)">
                </technology-selector>
            </form>

            <!-- Technology Cart -->
            <div *ngIf="showCartSuccessMessage" class="alert alert-success" role="alert">
                {{successOrErrorCartMessage}}
            </div>
            <div *ngIf="showCartErrorMessage" class="alert alert-danger" role="alert">
                {{successOrErrorCartMessage}}
            </div>
            <form [formGroup]="techCartItemFromService"  class="needs-validation" novalidate style="margin-top:15px;">
                <div class="alert alert-warning" role="alert">
                    <strong>Total Cost of Technologies in Cart :{{totalCostOfTechsinCart}}</strong>
                </div>
                <!-- Form Array Group -->
                 <technology-cart-selector 
                    [techCartArraySelector] = "techCartItemFromService" 
                    (onRemoveTechFromCart)="deleteTechFromCart($event)">
                </technology-cart-selector>  
            </form>
        
        
        </div>
        
      `
  
  })
  
  export class TechnologyCatalogComponent { // Export the component

    enableTechaddDiv:boolean = false;
    showSuccessMessage: boolean = false;
    showErrorMessage: boolean = false;
    successOrErrorMessage:string = "";
    totalCostOfTechs:number  = 0;
    totalCostOfTechsinCart:number  = 0;
    showCartSuccessMessage: boolean = false;
    showCartErrorMessage: boolean = false;
    successOrErrorCartMessage:string = "";

    constructor(private router:Router,
                private fb:FormBuilder,
                private techService:TechnologyService) {

    }  

    /***************************** Generic and common methods*******************/

    //Init method called when the class is initilized
    ngOnInit() {
        //console.log('IN Smart component');
        //Fork Join , It will fork thesr 2 observables and join them  and give us the data back
        //Disadvantage is it will fail both if one fails, we can log the error (Search how??????)
        Observable.forkJoin(this.techService.getTechnologies(),
                            this.techService.getTechnologiesCart()).
                                subscribe(data => {                                    
                                    let technologies = data[0] as TechnologyModel[];
                                    let technologiesCart = data[1] as TechnologyCartModel[];
                                    technologiesCart.forEach((item: TechnologyCartModel) => {   
                                        //console.log(item.techCost);                                     
                                        this.addTechToCart(item);
                                    })

                                    technologies.forEach((item:TechnologyModel) => {
                                        //console.log(item.techName);
                                        this.addTechology(item);
                                    })
                                }); 
        this.techService.testTheRestService().subscribe((data:string) => {
            console.log("Data from Rest service : " , data);
        })
        //listen to the changes made to the technology items
        //this.techologiesFromService.valueChanges.subscribe(changes => console.log(changes));
        this.techologiesFromService.get('technologyItems').valueChanges.subscribe(changes => this.calculateTotalTech(changes));
        this.techCartItemFromService.get('techCartItems').valueChanges.subscribe(changes => this.calculateTotalTechInCart(changes));
    }

    enableTechadd() {
        this.enableTechaddDiv = true;
    }

    disableTechadd() {
        this.enableTechaddDiv = false;
    }    

    /* Clear the form array */
    clear_array(theFormArrayWeGotAsAParameter) {
        for (let i = theFormArrayWeGotAsAParameter.controls.length - 1; i >= 0; i--) {
            theFormArrayWeGotAsAParameter.removeAt(i);
        }
    }

    /*****************************Technogy Methods******************************/

    // Reactive Model for Technologies
    techologiesFromService =  this.fb.group({
        technologyItems: this.fb.array([

        ])
    })  

    //Form Technology Form Group Object from technology Model
    formTechFormObj(item: TechnologyModel) {
        return this.fb.group({ 
            id: [item.id,Validators.required],           
            techName: [item.techName,Validators.required],
            techDuration:  [item.techDuration,Validators.required],
            techCost: [item.techCost,[Validators.required,TechnologyValidator.validateTechPrice]],
            techOnlineTraining: item.techOnlineTraining,
            techstartDate: [item.techstartDate,Validators.required]
        })
    }      

    //Add Technology to the existing Technology Form Array
    addTechology(item: TechnologyModel) {
        let newTech = this.formTechFormObj(item);
        const existingTechStore = this.techologiesFromService.get('technologyItems') as FormArray;
        existingTechStore.push(newTech);
        //console.log(newTech.value);        
    }
    

    //Initialize the values for the add tech component
    initialAddStore = this.fb.group({
        technology: this.fb.group({
            id: [0,Validators.required],  
            techName:[null,Validators.required],
            techDuration: [0,Validators.required],
            techCost:[0,[Validators.required,TechnologyValidator.validateTechPrice]],
            techOnlineTraining:false,
            techstartDate:[null,Validators.required]
        })
    })

    //Add a technology (Service method to add the technology to the DB)
    onTechnologyAdd(technology:any) {        
        this.techService.addTechnology(technology).subscribe((response:TechnologyModel) => {
            //Clear all the items and add new ones from DB
            this.clear_array(this.techologiesFromService.get('technologyItems'));
            this.techService.getTechnologies().subscribe((data: TechnologyModel[]) => {
                data.forEach((tech: TechnologyModel) => {
                    this.addTechology(tech);
                })                         
            })    
            
            this.successOrErrorMessage=  "Added new technology : " + technology.techName;            
            this.showSuccessMessage = true;  
            this.showErrorMessage = false;;  
            this.enableTechaddDiv = false;
        },
        (error) => {
            //console.log("Error from the service " ,  error.status,error.url);   
            //console.log(error)    ; //Insert failed, duplicate id    
            this.showErrorMessage = true;               
            this.successOrErrorMessage=  "Error adding  new technology : " + technology.techName;
            if(error.status === 500) {
                //console.log(error._body.indexOf("Insert failed, duplicate id"));
                if(error._body.indexOf("Insert failed, duplicate id") !== -1) {
                    this.successOrErrorMessage=  "Duplicate ID , ID : " +  technology.id +" exists."
                }
            }

        });        
    }

    //Remove a technology (Service method to remove the technology to the DB)
    deleteTech(technology:FormGroup){
        //Convert formgroup to technology model
        const technologyAsModel =  technology.value;
        this.techService.removeTechnology(technologyAsModel).subscribe((response: TechnologyModel) => {
            //Clear all the items and add new ones from DB
            this.clear_array(this.techologiesFromService.get('technologyItems'));
            this.techService.getTechnologies().subscribe((data: TechnologyModel[]) => {
                data.forEach((tech: TechnologyModel) => {
                    this.addTechology(tech);
                })                         
            })
        });
        this.successOrErrorMessage=  "Removed technology : " + technologyAsModel.techName;            
        this.showSuccessMessage = true;  
        this.showErrorMessage = false;  
        this.enableTechaddDiv = false;
    }

    //Calculate th total cost for all Technologies
    calculateTotalTech(changes: TechnologyModel[]) {
        this.totalCostOfTechs = changes.reduce((prev,next) => prev + next.techCost,0);
    }

    /******************* Cart Methods ***********************************/

    // Reactive Model for Cart
    techCartItemFromService =  this.fb.group({
        techCartItems: this.fb.array([

        ])
    })    

    //Form Tech Cart Form Array from Technology Cart Obj
    formTechCartFormArrayFromTechnologyObj(item: TechnologyCartModel) {
        return this.fb.group({
            id:item.id,
            techName: item.techName,
            techCost: item.techCost,
            techstartDate: item.techstartDate
        })
    }

    //Form Tech Cart Form Array from Technology  Obj
    convertTechnologyToTechnologyCartFormArray(item: TechnologyModel) {
        return this.fb.group({
            id:item.id,
            techName: item.techName,
            techCost: item.techCost,
            techstartDate: item.techstartDate
        })
    }

    //Add technology to the cart Form Array 
    addTechToCart(item: TechnologyCartModel) {
        let newCartItem = this.formTechCartFormArrayFromTechnologyObj(item);
        const existingTechCartStore = this.techCartItemFromService.get('techCartItems') as FormArray;
        existingTechCartStore.push(newCartItem);        
    } 

    //Add a technology to Cart
    addTechnologyToCart(technology:FormGroup){
        //Convert formgroup to technology model
        const technologyAsModel =  technology.value;
        //Convert technology to technology Cart FormGroup
        const techCartFormArray = this.convertTechnologyToTechnologyCartFormArray(technologyAsModel);
        const techCartModelObj = techCartFormArray.value;
        //console.log('Here');
        //console.log(techCartModelObj);
       this.techService.addTechnologyToCart(techCartModelObj).subscribe((addedTech:TechnologyCartModel) => {
            this.clear_array(this.techCartItemFromService.get('techCartItems'));
            this.techService.getTechnologiesCart().subscribe((data:TechnologyCartModel[]) => {
                data.forEach((tech: TechnologyCartModel) => {
                    this.addTechToCart(tech);
                }) 
            })
       })
       
        this.showCartSuccessMessage = true;
        this.showCartErrorMessage = false;
        this.successOrErrorCartMessage = "Added technology : " + technologyAsModel.techName + " to the Cart.";  
    }   

    deleteTechFromCart(technology:FormGroup){
        //Convert formgroup to technology model
        const technologyAsModel =  technology.value;
        this.techService.removeTechnologyFromCart(technologyAsModel).subscribe((response: TechnologyCartModel) => {
            //Clear all the items and add new ones from DB
            this.clear_array(this.techCartItemFromService.get('techCartItems'));
            this.techService.getTechnologiesCart().subscribe((data: TechnologyCartModel[]) => {
                data.forEach((techr: TechnologyCartModel) => {
                    this.addTechToCart(techr)
                })                         
            })
        });      
       
        this.showCartSuccessMessage = true;
        this.showCartErrorMessage = false;
        this.successOrErrorCartMessage = "Removed technology : " + technologyAsModel.techName + " from the Cart.";
    }
    

    //Calculate th total cost for all Technologies in Cart
    calculateTotalTechInCart(changes: TechnologyCartModel[]) {
        this.totalCostOfTechsinCart = changes.reduce((prev,next) => prev + next.techCost,0);
    }

    /************************************ Cart & Technology methods (/) ****************************/

      /*//Single formGroup
      store = new FormGroup({
        technology: new FormGroup({
            techName:new FormControl("Java"),
            techDuration: new FormControl(3),
            techCost:new FormControl(1500.99),
            techOnlineTraining:new FormControl(true),
            techstartDate:new FormControl(new Date())
        })
      }) 

      



      //Form Array
      arrayStore = new FormGroup({
          technologies: new FormArray([
            new FormGroup({
                techName:new FormControl("Java"),
                techDuration: new FormControl(3),
                techCost:new FormControl(1500.99),
                techOnlineTraining:new FormControl(true),
                techstartDate:new FormControl(new Date())
            }) , 
            new FormGroup({
                techName:new FormControl("Microstrategy"),
                techDuration: new FormControl(5),
                techCost:new FormControl(3500.99),
                techOnlineTraining:new FormControl(true),
                techstartDate:new FormControl(new Date())
            }), 
            new FormGroup({
                techName:new FormControl("Angular JS"),
                techDuration: new FormControl(5),
                techCost:new FormControl(2500.99),
                techOnlineTraining:new FormControl(true),
                techstartDate:new FormControl(new Date())
            }), 
            new FormGroup({
                techName:new FormControl("Microservices"),
                techDuration: new FormControl(5),
                techCost:new FormControl(4500.99),
                techOnlineTraining:new FormControl(true),
                techstartDate:new FormControl(new Date())
            }), 
            new FormGroup({
                techName:new FormControl("R"),
                techDuration: new FormControl(1),
                techCost:new FormControl(500.99),
                techOnlineTraining:new FormControl(false),
                techstartDate:new FormControl(new Date())
            })
          ])
      })

      //Form array using FormBuilder

      arrayStoreUsingFormBuilder = this.fb.group({
        technologies: this.fb.array([
            this.fb.group({
              techName: "Java",
              techDuration:  3,
              techCost: 1500.99,
              techOnlineTraining: true,
              techstartDate: new Date()
          }) , 
          this.fb.group({
              techName: "Microstrategy",
              techDuration:  5,
              techCost: 3500.99,
              techOnlineTraining: true,
              techstartDate: new Date()
          }), 
          this.fb.group({
              techName: "Angular JS",
              techDuration:  5,
              techCost: 2500.99,
              techOnlineTraining: true,
              techstartDate: new Date()
          }), 
          this.fb.group({
              techName: "Microservices",
              techDuration:  5,
              techCost: 4500.99,
              techOnlineTraining: true,
              techstartDate: new Date()
          }), 
          this.fb.group({
              techName: "R",
              techDuration:  1,
              techCost: 500.99,
              techOnlineTraining: false,
              techstartDate: new Date()
          })
        ])
    })*/
      
      
  
      
      
  }