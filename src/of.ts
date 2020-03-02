import {
    DateDescriptor,
    asDateDescriptorArray,
    isDateDescriptor
} from './date-descriptor'


function datestringInFormatUTC(datestring: string): boolean {
    return /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d.\d\d\dZ$/.test(datestring)
}

function datestringInFormatISOWithTime(datestring: string): boolean {
    return /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d$/.test(datestring)
        || /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d.\d\d\d$/.test(datestring)
}

function datestringInFormatISOWithoutTime(datestring: string): boolean {
    return /^\d\d\d\d-\d\d-\d\d$/.test(datestring)
}


export function of(year: number): Date;
export function of(datestring: string): Date;
export function of(descriptor: DateDescriptor): Date;
export function of(value: number | string | DateDescriptor): Date {
    if (typeof value === 'number') {
        return new Date(value)
    }

    if (typeof value === 'string') {
        if (datestringInFormatUTC(value)) {
            return new Date(value)
        }
        if (datestringInFormatISOWithTime(value)) {
            return new Date(value + '.000Z')
        }
        if (datestringInFormatISOWithoutTime(value)) {
            return new Date(value + 'T00:00:00.000Z')
        }
        throw new Error(`Expected date-string to be in UTC or ISO time, got '${value}'`)
    }

    if (isDateDescriptor(value)) {
        return new Date(Date.UTC(...asDateDescriptorArray(value)))
    }

    throw new Error(`Expected argument to be of type number or string or DateDescriptor, got '${value}'`)
}

//  LocalWords:  DateDescriptor
