import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'reorder'
})
export class ReorderPipe implements PipeTransform {

    transform(array: any): Object[] {

        array.sort((a: any, b: any): number => {
            var first = a.created_at;
            var second = b.created_at;
            return first.isBefore(second) ? -1 : first.isAfter(second) ? 1 : 0;
        });
        return array;
    }

}
