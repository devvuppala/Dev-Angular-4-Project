import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contactus',
  styleUrls: ['app.component.scss'],
  template: `
    <div class="container">
        contact @{{companyname}} . Copyrights reserved.
    </div>
    
  `
})


export class ContactUsComponent {
  companyname:string = 'Dev';
    

}
