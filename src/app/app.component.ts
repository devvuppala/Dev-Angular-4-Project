import { Component,ViewChild , AfterContentInit , AfterViewInit , ViewChildren , QueryList , ChangeDetectorRef} from '@angular/core';
import {ContactUsComponent} from './app.contactus.component'

interface Product {
    name:string;
    type:string;
    premium:boolean;
}

@Component({
  selector: 'app-root',
  //templateUrl: './app.component.html',
  styleUrls: ['app.component.scss','dashboard.css'],
  template: `
    <!--<nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand">Angular 4 APP</a>
        </div>
        <ul class="nav navbar-nav">
          <li  routerLinkActive="active"  [routerLinkActiveOptions]="{exact:true}"><a routerLink="/">Home</a></li>
          <li  routerLinkActive="active"><a routerLink="/contactus">Contact Us</a></li>
          <li  routerLinkActive="active"  [routerLinkActiveOptions]="{exact:true}"><a routerLink="">logout</a></li>
        </ul>
      </div>
    </nav>-->
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Dev's Angular Project</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right">
            <li  routerLinkActive="active"  [routerLinkActiveOptions]="{exact:true}"><a routerLink="/">Home</a></li>
            <li  routerLinkActive="active"><a routerLink="/contactus">Contact Us</a></li>
            <li  routerLinkActive="active"  [routerLinkActiveOptions]="{exact:true}"><a routerLink="/logout">logout</a></li>
            <li><a href="#">Settings</a></li>
            <li><a href="#">Profile</a></li>
            <li><a href="#">Help</a></li>
          </ul>
          <form class="navbar-form navbar-right">
            <input type="text" class="form-control" placeholder="Search...">
          </form>
        </div>
      </div>
    </nav>

    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3 col-md-2 sidebar">
          <ul class="nav nav-sidebar">
          <li  routerLinkActive="active"  [routerLinkActiveOptions]="{exact:true}"><a routerLink="/products">Products</a></li>
          <li  routerLinkActive="active"  [routerLinkActiveOptions]="{exact:true}"><a routerLink="/technology">Technologies</a></li>
          </ul>
          <ul class="nav nav-sidebar">
            <li  routerLinkActive="active"  [routerLinkActiveOptions]="{exact:true}"><a routerLink="/microstategyReports">Microstrategy Reports</a></li>
            <li><a href="/grids">Grids - Test</a></li>
            <li class="disabled"><a href="">One more nav</a></li>
            <li class="disabled"><a href="">Another nav item</a></li>
            <li class="disabled"><a href="">More navigation</a></li>
          </ul>
          <ul class="nav nav-sidebar">
            <li class="disabled"><a href="">Set 3 -  Row 1</a></li>
            <li class="disabled"><a href="">One more nav</a></li>
            <li class="disabled"><a href="">Another nav item</a></li>
          </ul>
        </div>
        <div class=" router-outlet-buffer">
          <router-outlet></router-outlet>
        </div>
      </div>
      </div>
    <!--<div class="container">
      <router-outlet></router-outlet>
    </div>
    <div class="container">
      <app-contactus></app-contactus>
      <!--<app-contactus></app-contactus>
      <app-contactus></app-contactus>-->
    <!--</div>
    
    <!--<app-login></app-login>-->
    <!--<product-catalog></product-catalog>-->
  `
})


export class AppComponent  implements AfterContentInit , AfterViewInit{
  title:string = "Dev's Angular App";
  amount:number;
  showNavigationBar:boolean = false;

  @ViewChild(ContactUsComponent) contactUs : ContactUsComponent;
  @ViewChildren(ContactUsComponent) contactUsComps : QueryList<ContactUsComponent>;
  constructor(private _cd:ChangeDetectorRef) {

  }

  ngAfterContentInit() {

  }

  ngAfterViewInit() { 
   /* console.log(this.contactUs);
    setTimeout(() => {      
      this.contactUsComps.forEach((contactusItem : ContactUsComponent) => {
        contactusItem.companyname = "New Company in Array Name";
      })
    })*/
    this.contactUsComps.forEach((contactusItem : ContactUsComponent) => {
      contactusItem.companyname = "New Company in Array Name";
    })
    //Invoke the change detetection
    this._cd.detectChanges();
  }



}
