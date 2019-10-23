let expect = require('expect');

let {isRealString} = require('./validation');


describe('isRealString', () => {
    it('should reject non-string values', () => {
        expect(isRealString(6563)).toBe(false);
    });

    it('should reject strings with only spaces', () => {
        expect(isRealString('     ')).toBe(false);
    });

    it('should return non-space string', () => {
        expect(isRealString('aksldf')).toBe(true);
    });

});