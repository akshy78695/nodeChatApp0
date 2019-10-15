let expect = require('expect');

let {generateMessage} = require('./message');

describe('generateMessage' , () => {

    it('should generate message correctly' , () => {
        let from = 'admin';
        let text = 'hi';
        let message = generateMessage(from, text);
        
        // console.log(typeof message.from);
        expect(message.from).toBe(from)
        expect(message.text).toBe(text)
        expect(typeof message.createdAt).toBe('number');
    })
});