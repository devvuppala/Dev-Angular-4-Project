import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-message',
  styleUrls: [],
  template: `
    <div class="container">
        This is a dynamic Component created by {{userName}}
    </div>
    
  `
})


export class MessageComponent {  
  
  userName: string = 'Dev';

}
