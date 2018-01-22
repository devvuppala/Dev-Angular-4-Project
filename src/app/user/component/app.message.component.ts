import {Component , Output , EventEmitter} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-message',
  template: `
    <div class="container">
        This is a dynamic Component created by {{userName}}
    </div>
    
  `
})


export class MessageComponent {  
  
  @Output() onDestroy : EventEmitter<string> = new EventEmitter<string>();
  userName: string = 'Dev';

  destroyMessage() {
    this.onDestroy.emit;
  }


}
