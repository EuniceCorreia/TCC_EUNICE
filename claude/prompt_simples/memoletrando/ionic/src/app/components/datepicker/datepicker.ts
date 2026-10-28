import { Serializable } from 'src/app/base/serializable';
import * as moment from 'moment';

export class Datepicker extends Serializable {

    dateFormat: string = "YYYY-MM-DD";
    closeOnSelect: boolean = false;
    setLabel: string = "OK";
    todayLabel: string = 'Hoje';
    closeLabel: string = 'Fechar';
    titleLabel: string = "Selecione uma Data";
    monthsList: any = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    weeksList: any = ["D", "S", "T", "Q", "Q", "S", "S"];
    clearButton: boolean = false;
    momentLocale: 'pt-BR'
    myDate: string = moment().format("YYYY-MM-DD")
    inputDate: string = moment().format("YYYY-MM-DD")
    yearInAscending: boolean = false
    btnProperties: any = {
        fill: 'solid',
        strong: true
    }

    constructor(data: Object = {}) {
        super();
        super.serialize(data);
    }

    setInputDateattribute(date) {
        this.inputDate = date
    }
}
