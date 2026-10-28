import { Pipe, PipeTransform } from '@angular/core';
/*
 * Máscara para CPF ou CNPJ
 * Usage:
 *   value | doc
 * Example:
 *   {{ 12345678910 | doc }}
 *   formats to: 123.456.789-10
 *   {{ 87141368000158 | doc }}
 *   formats to: 87.141.368/0001-58
*/
@Pipe({
    name: 'doc'
})
export class DocPipe implements PipeTransform {
    transform(input: string): string {

        if (!input) {
            return '';
        }

        var value = input.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return input;
        }

        if (value.length == 11) {
            //###.###.###-##
            var part1 = value.slice(0, 3);
            var part2 = value.slice(3, 6);
            var part3 = value.slice(6, 9);
            var part4 = value.slice(9);

            input = part1 + '.' + part2 + '.' + part3 + '-' + part4;
        } else if (value.length == 14) {
            //##.###.###/####-##
            var part1 = value.slice(0, 2);
            var part2 = value.slice(2, 5);
            var part3 = value.slice(5, 8);
            var part4 = value.slice(8, 12);
            var part5 = value.slice(12, 14);

            input = part1 + '.' + part2 + '.' + part3 + '/' + part4 + '-' + part5;
        }

        return input.trim();
    }
}