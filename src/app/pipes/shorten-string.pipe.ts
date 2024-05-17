import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'shortenString'
})

export class ShortenStringPipe implements PipeTransform {
    transform(value: string, maxLen: number = 10) {
        if (value.length > maxLen) {
            return value.substring(0, maxLen) + "...";
        }
        return value;
    }
}