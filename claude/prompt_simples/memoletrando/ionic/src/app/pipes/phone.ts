import { Pipe, PipeTransform } from '@angular/core';
/*
 * Máscara para numero de telefones
 * Usage:
 *   value | phone
 * Example:
 *   {{ 22222222 | phone }}
 *   formats to: 2222-2222
 *   {{ 42222222222 | phone }}
 *   formats to: (42) 22222-2222
*/
@Pipe({
    name: 'phone'
})
export class PhonePipe implements PipeTransform {
    transform(input: string): string {

        if (!input) {
            return '';
        }

        var value = input.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return input;
        }

        switch (value.length) {
            case 8:
                //####-####
                var part1 = value.slice(0, 4);
                var part2 = value.slice(4, 8);

                input = part1 + '-' + part2;
                break;
            case 9:
                //#####-####
                var part1 = value.slice(0, 5);
                var part2 = value.slice(5, 9);

                input = part1 + '.' + part2;
                break;
            case 10:
                //(##) ####-####
                var part1 = value.slice(0, 2);
                var part2 = value.slice(2, 6);
                var part3 = value.slice(6, 10);

                input = '(' + part1 + ') ' + part2 + '-' + part3;
                break;
            case 11:
                //(##) #####-####
                var part1 = value.slice(0, 2);
                var part2 = value.slice(2, 7);
                var part3 = value.slice(7, 11);

                input = '(' + part1 + ') ' + part2 + '-' + part3;
                break;
            case 12:
                //+## (##) ####-####
                var part1 = value.slice(0, 2);
                var part2 = value.slice(2, 4);
                var part3 = value.slice(4, 8);
                var part4 = value.slice(9, 12);

                input = '+' + part1 + ' (' + part2 + ') ' + part3 + '-' + part4;
                break;
            case 13:
                //+## (##) #####-####
                var part1 = value.slice(0, 2);
                var part2 = value.slice(2, 4);
                var part3 = value.slice(4, 9);
                var part4 = value.slice(9, 13);

                input = '+' + part1 + ' (' + part2 + ') ' + part3 + '-' + part4;
                break;
            case 14:
                //+### (##) #####-####
                var part1 = value.slice(0, 3);
                var part2 = value.slice(3, 5);
                var part3 = value.slice(5, 10);
                var part4 = value.slice(10, 14);

                input = '+' + part1 + ' (' + part2 + ') ' + part3 + '-' + part4;
                break;
            default:
                break;
        }

        return input.trim();
    }
}