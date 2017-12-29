import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  //templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  template: `
    <div class="container">
        <h3> Login </h3>
        <div class="form-group">
            User ID : <input type="text" placeholder="abc@gmail.com">
        </div>
        <div class="form-group">
            Password : <input type="password" placeholder="Enter password">
        </div>
        <div class="form-group">
            <!--<button routerLink="/products">Login</button>-->
            <!-- Imperative Routing -->
            <button (click)="routeToProductCatalog()" class="btn btn-primary">Login</button>
        </div>
    </div>
  `
})


export class LoginComponent {

    //Imperative Routing
    constructor(private router:Router){

    }

    routeToProductCatalog() {
        this.router.navigate(['products']);
    }

}
