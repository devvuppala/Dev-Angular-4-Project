//This is sa custom directive ( myRepeat , same as *ngFor)

import {Directive , Input,TemplateRef,ViewContainerRef} from '@angular/core';

@Directive({
    selector:'[myRepeat][myRepeatOf]'
})

export class MyRepeatDirective {

    constructor(private view:ViewContainerRef , private template:TemplateRef<any>) {

    }
    @Input()
    set myRepeatOf(collection:any) {
        collection.forEach((element,index) => {
            this.view.createEmbeddedView(this.template, {
                $implicit: element,
                index_attr : index * 100
            })
        });
    }

}