import {
    AndFilter,
    BooleanFilter,
    DateFilter,
    Filter,
    Message,
    NumberFilter,
    OrFilter,
    StringFilter,
} from "./type";

enum FilterTypes {
    STRING = "string",
    NUMBER = "number",
    BOOLEAN = "boolean",
    DATE = "date",
    OR = "or",
    AND = "and",
}

enum StringOperation {
    EQUAL = "eq",
    CONTAINS = "contains",
    ENDS_WITH = "endsWith",
    STARTS_WITH = "startsWith",
}

enum BooleanOperation {
    EQUAL = "eq",
}

enum NumberOperation {
    EQUAL = "eq",
    GREATER = "gt",
    GREATER_OR_EQUAL = "gte",
    LESS = "lt",
    LESS_OR_EQUAL = "lte",
}

enum DateOperations {
    EQUAL = "eq",
    AFTER = "after",
    BEFORE = "before",
}

const filterByType = (element: Message, filter: Filter): boolean => {
    const { type } = filter;

    switch (type) {
        case FilterTypes.STRING:
            return stringFilter(element, filter);
        case FilterTypes.NUMBER:
            return numberFilter(element, filter);
        case FilterTypes.BOOLEAN:
            return booleanFilter(element, filter);
        case FilterTypes.DATE:
            return dateFilter(element, filter);
        case FilterTypes.OR:
            return orFilter(element, filter);
        case FilterTypes.AND:
            return andFilter(element, filter);
        default:
            return false;
    }
};

const stringFilter = (element: Message, filter: StringFilter): boolean => {
    const { field, operation, value } = filter;
    const msg = String(element?.[field]).toLowerCase();
    const _value = String(value).toLowerCase();

    switch (operation) {
        case StringOperation.EQUAL:
            return msg === value;
        case StringOperation.STARTS_WITH:
            return msg.startsWith(_value);
        case StringOperation.ENDS_WITH:
            return msg.endsWith(_value);
        case StringOperation.CONTAINS:
            return msg.includes(_value);
        default:
            return false;
    }
};

const numberFilter = (element: Message, filter: NumberFilter): boolean => {
    const { field, operation, value } = filter;
    const msg = Number(element?.[field]);
    const _value = Number(value);

    switch (operation) {
        case NumberOperation.EQUAL:
            return msg === _value;
        case NumberOperation.GREATER:
            return msg > _value;
        case NumberOperation.LESS:
            return msg < _value;
        case NumberOperation.GREATER_OR_EQUAL:
            return msg >= _value;
        case NumberOperation.LESS_OR_EQUAL:
            return msg <= _value;
        default:
            return false;
    }
};

const booleanFilter = (element: Message, filter: BooleanFilter): boolean => {
    const { field, operation, value } = filter;
    const msg = element?.[field];
    const _value = Boolean(value);

    switch (operation) {
        case BooleanOperation.EQUAL:
            return msg === _value;
        default:
            return false;
    }
};

const dateFilter = (element: Message, filter: DateFilter): boolean => {
    const { field, operation, value } = filter;
    const msg: any = element[field];
    const _value = new Date(value);
    const _msg = new Date(msg);

    switch (operation) {
        case DateOperations.EQUAL:
            return _msg.getTime() === _value.getTime();
        case DateOperations.AFTER:
            return _msg.getTime() > _value.getTime();
        case DateOperations.BEFORE:
            return _msg.getTime() < _value.getTime();
        default:
            return false;
    }
};

const orFilter = (element: Message, filter: OrFilter): boolean => {
    const { filters } = filter;
    return filters.some((item) => filterByType(element, item));
};

const andFilter = (element: Message, filter: AndFilter): boolean => {
    const { filters } = filter;
    return filters.every((item) => filterByType(element, item));
};

export default filterByType;
