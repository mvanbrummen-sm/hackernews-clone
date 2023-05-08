import {getDomain} from "../../lib/utils/urlUtil";

describe('urlUtil', () => {
    describe('getDomain', () => {
        it('should return domain', () => {
            const result = getDomain('https://www.google.com/search?q=hello&oq=hello&aqs=chrome..69i57j0i433j0l8.1083j0j7&sourceid=chrome&ie=UTF-8')
            expect(result).toEqual('www.google.com')
        })
    })
})