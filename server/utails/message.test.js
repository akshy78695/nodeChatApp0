let expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
    it('should generate location' , () => {
        let from = 'user';
        let location = generateLocationMessage(from , 19, 72);

        expect(location.from).toBe(from);
        expect(location.url).toBe('https://www.google.com/maps?q=19,72');
        expect(typeof location.createdAt).toBe('number');
    });
});