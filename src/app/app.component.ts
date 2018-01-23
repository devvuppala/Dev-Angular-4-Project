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
  styleUrls: ['app.component.scss','navigationBar.scss'],
  template: `

  
  <nav class="navbar-expand-lg navbar navbar-dark bg-dark">
    <a class="navbar-brand" href="#">
      <img src="./assets/images/angular-14a0f6532f.png" width="30" height="30" alt="">
      Angular Project (Dev)
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active"   routerLinkActive="active"  [routerLinkActiveOptions]="{exact:true}">
          <a class="nav-link" routerLink="/">Home</a>
        </li>
        <!--<li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>-->
        
        <li class="nav-item dropdown"   routerLinkActive="active"  [routerLinkActiveOptions]="{exact:true}">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" 
              role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Forms And CRUD
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" routerLink="/products">Products</a>
            <a class="dropdown-item"  routerLink="/technology">Technologies</a>
            <!--<div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Something else here</a>
            </div>-->
          </div>
        </li>
          <!--<li class="nav-item">
            <a class="nav-link disabled" href="#">Disabled</a>
          </li>-->
        <li   class="nav-item "  routerLinkActive="active"  [routerLinkActiveOptions]="{exact:true}">
          <a class="nav-link" routerLink="/microstategyReports">Microstrategy Reports</a>
        </li>
        <li   class="nav-item "  routerLinkActive="active"  [routerLinkActiveOptions]="{exact:true}">
          <a  class="nav-link"  routerLink="/grids">Grids - Test</a>
        </li>
        <li   class="nav-item "  routerLinkActive="active"  [routerLinkActiveOptions]="{exact:true}">
          <a class="nav-link" routerLink="/reminders">Reminders - Ngrx Store</a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0"> 
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active" routerLinkActive="active">
              <a class="nav-link"routerLink="/contactus">Contact Us</a>
            </li>
            <li class="nav-item active" routerLinkActive="active"  [routerLinkActiveOptions]="{exact:true}">
              <a class="nav-link" style="color:red;" routerLink="">logout</a>
          </li>
        </ul>       
        <!--<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>-->
      </form>
    </div>
  </nav>
    <div class="router-outlet-buffer">
       <router-outlet></router-outlet>
    </div>
    <div class="footer-bottom">
    <div class="container">
      <div class="row">
        <div class="copyright-outlet-buffer">
          <!--Footer Bottom-->
          <p class="text-xs-center">&copy; Copyright 2018 - RANFT RR Team.  All rights reserved.</p>
        </div>
      </div>
    </div>
  </div>
    
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
    <!--<nav class="navbar navbar-toggleable-md navbar-light bg-faded">
      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand" href="#">Navbar</a>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Features</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Pricing</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown link
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
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
            <li><a href="/reminders">Reminders - Ngrx Store</a></li>
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
      </div>-->
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
