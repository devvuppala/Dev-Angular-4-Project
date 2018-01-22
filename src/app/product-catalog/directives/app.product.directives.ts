import {Directive,ElementRef , HostListener , HostBinding} from '@angular/core';

@Directive({
    selector:'[product-directive]',
    exportAs:'productDirective'
})

export class ProductDirectives {

    @HostBinding("style.border") elementBorder;
    @HostBinding("hidden") hiddenErrorMessage;
    @HostBinding("title") titleMessage;
    @HostBinding("style.color") colorOfInput;

    constructor(private hostElement: ElementRef) {

    }

    @HostListener('input') onInput(event:KeyboardEvent) {
        let value = this.hostElement.nativeElement.value;
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var numberRegex=/^[0-9]+$/;
        let newValue = value.split(',').join('');
        if(!newValue.match(numberRegex)) {
            this.elementBorder = '1px solid red';
            this.titleMessage = "Please enter only number(s)";
            this.colorOfInput = 'red';
        } else {
            this.elementBorder = '';
            this.titleMessage = "";
            this.colorOfInput = 'green';
        }
        this.hostElement.nativeElement.value = value;
    }
}