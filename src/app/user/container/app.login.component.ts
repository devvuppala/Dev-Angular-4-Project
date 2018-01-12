import { Component,ViewChild,ElementRef, AfterContentInit , AfterViewInit, ComponentFactoryResolver , ViewContainerRef } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router/src/router_state';
import {UserService} from '../service/app.user.service'
import { UserModel } from '../model/app.user.model';
import {CookieService} from 'ngx-cookie-service';
import { NgXCookies } from 'ngx-cookies';
import { ContactUsComponent } from '../../app.contactus.component';
import { MessageComponent } from '../component/app.message.component'

@Component({
  selector: 'app-login',
  //templateUrl: './app.component.html',
  //styleUrls: ['./app.component.scss'],
  template: `
    <!--<div class="container">
        <h3> Login </h3>
        <div class="form-group">
            User ID : <input type="text" id="username" placeholder="abc@gmail.com">
        </div>
        <div class="form-group">
            Password : <input type="password" id="password" placeholder="Enter password">
        </div>
        <div class="form-group">-->
            <!--<button routerLink="/products">Login</button>-->
            <!-- Imperative Routing -->
            <!--<button (click)="routeToProductCatalog()" class="btn btn-primary">Login</button>
        </div>
    </div> -->

    <!-- ngForm is a directive which will track all the imputs in the form -->
    <!-- // noValidate will disable the html validation -->

    <!--<form #loginForm = "ngForm" novalidate (ngSubmit) = "submitloginForm(loginForm.value)" >      
        <input type="text" placeholder="username" ngControl="username">
        <input type="password" placeholder="password" ngControl="password">
        <button type="submit">Submit</button> 
    </form>-->
    
    <div class="col-md-6 col-md-offset-3">
        <!--<h2>Login</h2>-->
        <ng-content select=".heading"></ng-content>
        <div *ngIf="showErrorMessage"> 
        <div class="alert alert-danger">
            <strong>Invalid user name or Password.</strong>
        </div>
        </div>
        <form name="form" (ngSubmit)="loginForm.form.valid && login()" #loginForm="ngForm" novalidate>
            <div class="form-group" [ngClass]="{ 'has-error': loginForm.submitted && !username.valid }">
                <label for="username">Username</label>
                <input type="text" class="form-control" name="username" [(ngModel)]="model.username" #username="ngModel" required />
                <div *ngIf="loginForm.submitted && !username.valid" class="help-block">Username is required</div>
            </div>
            <div class="form-group" [ngClass]="{ 'has-error': loginForm.submitted && !password.valid }">
                <label for="password">Password</label>
                <input type="password" class="form-control" name="password" [(ngModel)]="model.password" #password="ngModel" required />
                <div *ngIf="loginForm.submitted && !password.valid" class="help-block">Password is required</div>
            </div>
            <div class="form-group">
                <button [disabled]="loading" class="btn btn-primary">Login</button>
                <img *ngIf="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
               <!-- <a [routerLink]="['/register']" class="btn btn-link">Register</a> -->
            </div>

           <!--<div class="form-group">
             <input type="text" class="form-control" name="htmlComponentExample" #htmlComponentRef placeholder="Enter an email ID"/>
            </div> -->

            
        </form>
        <app-message></app-message>
        <div #messageComponentRef></div>
    </div>
  `
})


export class LoginComponent implements AfterContentInit , AfterViewInit{
    model: UserModel = {username:'',password:''};
    loading = false;
    returnUrl: string;
    showErrorMessage:boolean = false;
    cookieValue = 'UNKNOWN';
    cookieName:string = "attESSec";
    
    //Imperative Routing
    constructor(private router:Router,
        private userService:UserService,
        private cookieService: CookieService,
        private componentFactoryResolver: ComponentFactoryResolver){

    }

    @ViewChild(MessageComponent) messageComponent : MessageComponent; // Get hold of Message component

    @ViewChild('htmlComponentRef') htmlCompRef : ElementRef; // This is to get hold of a html component 

    /*This is to get hold of a dynamic component ***messageComponentRef*** (used in the div) , for this to consider the reference as 
     a new component we have to use read {read:ViewContainerRef} , if not it will consider ad a html component*/
    @ViewChild('messageComponentRef',{read:ViewContainerRef}) messageComponentContainerReference : ViewContainerRef;

    //This is to consider as a html component
    @ViewChild('messageComponentRef') messageComponentElementReference : ViewContainerRef; 

    ngAfterContentInit() {
        /*const dummyHtmlRefElement = this.htmlCompRef.nativeElement; 
        dummyHtmlRefElement.setAttribute('placeholder','Enter a name');
        dummyHtmlRefElement.focus();*/

        //Create a new dynamic component Factory
        const messageComponentFactory = this.componentFactoryResolver.resolveComponentFactory(MessageComponent);
        //Create a new component
        const messgaeComponentRef = this.messageComponentContainerReference.createComponent(messageComponentFactory);
        //Get hold of elements of the component
        messgaeComponentRef.instance.userName = "Dev Vuppala"
    }

    ngAfterViewInit() {

    }


    /* Use this if you need to access cookies 
    ngOnInit() {
        //console.log(this.cookieService.getAll);
       // this.cookieService.get("cookieName");
        console.log(this.cookieService.get("cookieName"));
       // console.log(NgXCookies.getCookie("cookieName"));

       // this.cookieService.set( 'Test', 'Hello World' );
        //this.cookieValue = this.cookieService.get('Test');     
       /* this.cookieName = encodeURIComponent(this.cookieName);

			let regexp = new RegExp('(?:^' + this.cookieName + '|;\\s*' + this.cookieName + ')=(.*?)(?:;|$)', 'g');
			let cookies = regexp.exec(document.cookie);
            console.log(decodeURIComponent(cookies[1]));
			return decodeURIComponent(cookies[1]);*/
      
        // reset login status
        //this.authenticationService.logout();
 
        // get return url from route parameters or default to '/'
        //this.returnUrl = this.router.snapshot.queryParams['returnUrl'] || '/';
   /* }*/
 
    ngOnInit() {
        console.log(this.cookieService.get("attESSec"));
    }

    login() {
        //console.log(this.model.username);
        //console.log(this.model.password);
        this.loading = true;
        /*this.userService.getById(1).subscribe ((user:UserModel) => 
            console.log(user.password)
         );*/
         this.userService.getByUserName(this.model.username).subscribe ((user:UserModel) => 
         {
            if (user[0] != undefined && user[0].password != undefined) {
                if(user[0].password === this.model.password) {
                    this.router.navigate(['products']);
                } else {
                    this.showErrorMessage = true;
                }
            }
         }     
         );
         this.loading  = false;
        /*this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });*/
    }

    routeToProductCatalog() {
        this.router.navigate(['products']);
    }

    submitloginForm(userDetails : UserModel) {
        console.log(userDetails.username);
        console.log(userDetails.password);
    }

   


}
