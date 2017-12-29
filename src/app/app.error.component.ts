import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  //templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  template: `
    <div class="container">
         Page not Found - <a routerLink="/"> Back to Login Page </a>
    </div>
  `
})


export class ErrorComponent {


}
