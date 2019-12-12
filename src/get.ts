import { curry } from './curry'
import { parseDate, parseAccessibleUnitOfTime } from './parse'

const get = curry(
    function get(
        unit:
            | 'millisecond'
            | 'second'
            | 'minute'
            | 'hour'
            | 'day'
            | 'date'
            | 'month'
            | 'year'
            | 'unix',
        date: Date
    ): number {

        parseAccessibleUnitOfTime(unit)
        parseDate(date)

        switch (unit) {
            case 'millisecond':
                return date.getUTCMilliseconds()
            case 'second':
                return date.getUTCSeconds()
            case 'minute':
                return date.getUTCMinutes()
            case 'hour':
                return date.getUTCHours()
            case 'date':
                return date.getUTCDate()
            case 'day':
                return date.getUTCDay()
            case 'month':
                return date.getUTCMonth()
            case 'year':
                return date.getUTCFullYear()
            case 'unix':
                return date.getTime()
        }
    }
)

export { get }
