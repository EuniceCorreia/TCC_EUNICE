
import * as moment from 'moment';

function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
    return o[propertyName]; // o[propertyName] is of type T[K]
}

function snakeToCamel(s: any) {
    return s.replace(/(\_\w)/g, function (m:any) { return m[1].toUpperCase(); });
}

export class Serializable {

    public id: any;
    public loading: boolean = true;
    [key: string]: number | string | boolean | any | undefined;

    constructor() {
        //
    }


    serialize(data: any = {}) {
        var properties = Object.keys(data);

        properties.forEach(property => {

            var prop: any = JSON.parse(JSON.stringify(property));
            var original = JSON.parse(JSON.stringify(property));

            this.loading = true;

            if (this.aliasExists(prop)) {
                prop = this.fetchAlias(prop);
            }

            if (!this.propertyIsDeclared(prop)) {
                return this;
            }

            if (this.hasSetter(prop)) {
                return this.runSetter(prop, data[prop]);
            }

            if (this.propertyIsDate(prop) && data[prop] !== null) {

                this.setDate(prop, data[prop]);

            } else if (this.propertyIsFloat(prop) && data[prop] !== null) {

                this[prop] = parseFloat(data[prop]);

            } else if (this.relationExists(original)) {

                this.setRelatable(prop, data[original], original);

            } else {

                this.set(prop, data[prop]);

            }
            this.loading = false

        }, this);


        return this;
    }

    propertyIsDeclared(property: string) {
        return !!Object.getOwnPropertyDescriptor(this, property);
    }

    set(property: string, value: any) {

        if (this.aliasExists(property)) {
            this[this.alias[property]] = value;
        } else {
            this[property] = value;
        }

    }

    insert(property: string, value: any) {
        var data: any = {};

        data[property] = value;

        this.serialize(data);
    }

    setRelatable(property: string, value: any, original: any) {

        var overwrite = true;

        if (this.aliasExists(original)) {
            var item = this.relations[original];
            overwrite = false;
        } else {
            var item = this.relations[property];
        }

        if (this.propertyIsArray(property)) {

            for (var i = 0; i < value.length; i++) {
                if (overwrite) {
                    this[property][i] = this.serializeRelation(value[i], item);
                } else {
                    this[property].push(this.serializeRelation(value[i], item));
                }
            }

        } else {

            this[property] = this.serializeRelation(value, item);

        }
    }

    addTo(property: string, value: any, unshift: boolean = false) {

        if (!this.propertyIsArray(property)) {
            return this;
        }

        var is_array = Array.isArray(value);

        if (this.relationExists(property)) {

            if (this.aliasExists(property)) {
                var item = this.relations[this.alias[property]];
            } else {
                var item = this.relations[property];
            }
            if (is_array) {
                value.forEach((array_value: any) => {
                    if (unshift) {
                        this[property].unshift(this.serializeRelation(array_value, item));
                    } else {
                        this[property].push(this.serializeRelation(array_value, item));
                    }
                }, this);
            } else {
                if (unshift) {
                    this[property].unshift(this.serializeRelation(value, item));
                } else {
                    this[property].push(this.serializeRelation(value, item));
                }
            }


        } else {
            if (is_array) {
                value.forEach((array_value: any) => {
                    if (unshift) {
                        this[property].unshift(array_value);
                    } else {
                        this[property].push(array_value);
                    }
                }, this);
            } else {
                if (unshift) {
                    this[property].unshift(value);
                } else {
                    this[property].push(value);
                }

            }
        }

        return this;
    }

    select(property: string, array: Array<any>) {
        this[property] = array.find(
            item => (item.id == this[property].id)
        );

        return this;
    }

    compare(property: string, value: any, strict: boolean = false) {
        return strict ? (this[property] === value) : (this[property] == value);
    }

    unset(property: string) {
        if (this.propertyIsDeclared(property)) {
            this[property] = null;
        }
    }

    get dates(): any {
        return [];
    }

    get relations(): any {
        return {};
    }

    get http_data(): any {
        return {};
    }

    get float(): any {
        return [];
    }

    get alias(): any {
        return {};
    }

    /** TODO: Realizar a verificação sem precisar declarar array 'dates'
     * Caso o atributo for declarado como uma instancia 
     * de moment.Moment, retornar true
     */
    propertyIsDate(property: string) {
        return (this.dates.indexOf(property) > -1);
    }

    propertyIsFloat(property: string) {
        return (this.float.indexOf(property) > -1);
    }

    propertyIsArray(property: string) {
        return Array.isArray(this[property]);
    }

    serializeRelation(source: any, constructor: any) {
        if (source === null) {
            return null;
        } else {
            try {
                return new constructor(source, this);
            } catch (e) {
                return source;
            }
        }
    }

    setDate(property: string, value: any) {
        this[property] = moment(value);
    }

    formatDate(property: string, format: string = 'DD/MM/YYYY') {
        return moment(this[property]).format(format);
    }

    relationExists(property: string) {
        return (Object.keys(this.relations).indexOf(property) > -1) && (this.relations[property] !== null);
    }

    aliasExists(property: string) {
        return (Object.keys(this.alias).indexOf(property) > -1) && (this.alias[property] !== null);
    }

    fetchAlias(property: string) {
        return this.alias[property];
    }

    deepSearch(search: string = '', items: Array<Serializable> = []) {
        return items.filter(item => JSON.stringify(item).toLocaleLowerCase().includes(search));
    }

    hasSetter(property: any) {
        var function_name = 'set_' + property + '_attribute';
        return typeof this[snakeToCamel(function_name)] === 'function';
    }

    runSetter(property: any, data: any) {
        var function_name = snakeToCamel('set_' + property + '_attribute');

        return this[function_name](data);
    }
}
