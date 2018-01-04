import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router/src/router_state';
import {UserService} from '../service/app.user.service'
import { UserModel } from '../model/app.user.model';

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
        <h2>Login</h2>
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
        </form>
    </div>
  `
})


export class LoginComponent {
    model: UserModel = {username:'',password:''};
    loading = false;
    returnUrl: string;
    showErrorMessage:boolean = false;
 
    
    //Imperative Routing
    constructor(private router:Router,
        private userService:UserService){

    }
 
    ngOnInit() {
        // reset login status
        //this.authenticationService.logout();
 
        // get return url from route parameters or default to '/'
        //this.returnUrl = this.router.snapshot.queryParams['returnUrl'] || '/';
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
