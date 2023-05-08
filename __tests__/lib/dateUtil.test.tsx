import {convertUnixTimeToSince} from "../../lib/dateUtil";
import timekeeper from "timekeeper";

describe('dateUtil', () => {
    describe('convertUnixTimeToSince', () => {
        beforeEach(() => {
            timekeeper.freeze(new Date(2023, 2, 1, 11, 30, 20, 0));
        })

        afterEach(() => {
            timekeeper.reset();
        })

        it('should convert unix time for seconds ago', () => {
            const result = convertUnixTimeToSince(1677634210)

            expect(result).toEqual('10 seconds')
        })

        it('should convert unix time for minutes ago', () => {
            const result = convertUnixTimeToSince(1677633600)

            expect(result).toEqual('10 minutes')
        })

        // test for should convert unix time for hours ago
        it('should convert unix time for hours ago', () => {
            const result = convertUnixTimeToSince(1677615600)

            expect(result).toEqual('5 hours')
        })

        it('should convert unix time for days ago', () => {
            const result = convertUnixTimeToSince(1677442800)

            expect(result).toEqual('2 days')
        })

        it('should convert unix time for months ago', () => {
            const result = convertUnixTimeToSince(1669954800)

            expect(result).toEqual('2 months')
        })

        it('should convert unix time for years ago', () => {
            const result = convertUnixTimeToSince(1614562210)

            expect(result).toEqual('2 years')
        })
    })
})
