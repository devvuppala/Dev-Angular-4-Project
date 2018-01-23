import { AbstractControl } from "@angular/forms";

export class TechnologyValidator {

    static validateTechPrice(control: AbstractControl) {
        let priceValue = control.value;
        //you can write a regular expression to check this
        if(priceValue > 100) {
            return null;
        } else {
            return {invalidTechPrice:true};
        }
     }
}