import { Component } from '@angular/core';

interface Product {
    name:string;
    type:string;
    premium:boolean;
}

@Component({
  selector: 'app-root',
  //templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  template: `
    <div align="center">
        <h1>
        <img width="45" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg=="> Welcome to {{title}}
        </h1>      
    </div>
    
    <div>
      <input type="number"   [(ngModel)] = "amount"/>
      <h1>Amount : {{amount}} </h1>
    </div>

    <div>
      <label>{{product.name}}</label>
    </div>
    <div>
      <label>{{product.type}}</label>
    </div>
    <div>
      <span *ngIf="product.premium" class="premium"></span>
      <label>{{product.premium}}</label>
    </div> 
    <div *ngFor="let product of products" >
      <div>_________________________________</div>
      <div><label>{{product.name}}</label></div>
      <div><label>{{product.type}}</label></div>
      <div >
      <span class="status" [ngClass] = "{'premium':product.premium, 'non-preimum':!product.premium}"></span>
      <label>{{product.premium}}
      </label></div>
    </div>  
  `
})


export class AppComponent {
  title:string = "Dev's Angular App";
  amount:number;

  product:any = {
    name:'Outliers',
    type:'Books',
    premium:true
  }

  products:Product[] = [{
    name:'Outliers',
    type:'Books',
    premium:true
  } , {
    name:'Math',
    type:'Books',
    premium:true
  } , {
    name:'Carrom',
    type:'Books',
    premium:false
  } , {
    name:'One More',
    type:'Books',
    premium:true
  }]

}
