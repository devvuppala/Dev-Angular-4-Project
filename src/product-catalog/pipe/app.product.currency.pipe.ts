import { Pipe,PipeTransform } from "@angular/core";

@Pipe({
    name:'productCurrencyPipe'
})

export class ProductCurrency implements PipeTransform {
    transform(value,currency,discount,discountGiven){
        //console.log(value);
        var originalPrice:number = value + (value * discountGiven) / 100 ;
        return `${currency} ${value} (${originalPrice})`
    }
}

