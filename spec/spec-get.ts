import { testProp, fc } from 'ava-fast-check'
import { not, includedIn } from './util'
import { unitsOfTime, accessibleUnitsOfTime, AccessibleUnitOfTime, } from '../src/unit-of-time'

/**
 * Library under test
 */

import { get } from '../src/get'

/*********************************************************************
 * Negative test cases
 ********************************************************************/

/* eslint-disable @typescript-eslint/no-explicit-any */

testProp(
    'should throw on unsupported unit',
    [
        fc.oneof<any>(
            fc.string().filter(not(includedIn(unitsOfTime as unknown as string[]))),
            fc.date(),
            fc.object(),
            fc.float(),
            fc.integer()
        ),
        fc.date()
    ],
    (unit: any, date: Date) => {
        try {
            get(unit, date)
            return false
        } catch (error) {
            return true
        }
    },
    {verbose: true}
)

testProp(
    'should throw when date is not a Date',
    [
        fc.constantFrom(...accessibleUnitsOfTime),
        fc.oneof<any>(fc.string(), fc.object(), fc.boolean(), fc.float(), fc.integer())
    ],
    (unit: AccessibleUnitOfTime, date: any) => {
        try {
            get(unit, date)
            return false
        } catch (error) {
            return true
        }
    },
    {verbose: true}
)
