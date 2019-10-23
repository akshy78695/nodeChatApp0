let expect = require('expect');

let {Users} = require('./users');


describe('Users', () => {
    var users;
    beforeEach(() => {
        users = new Users();

        users.users = [{
            id: '1', 
            name: 'one',
            room: 'room1'
        },
        {
            id: '2', 
            name: 'two',
            room: 'room2'
        },
        {
            id: '3', 
            name: 'three',
            room: 'room1'
        }]
    });

    it('should add user', () => {
        let users = new Users();

        let user = {
            id: '123',
            name: 'akshay', 
            room: 'A'
        }

        let resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should return remove user' , () => {
        let id = '1';
        let user = users.removeUser(id);

        expect(user.id).toBe(id);
        expect(users.users.length).toBe(2);
    });
    
    it('should not remove user', () => { 
        let id = '99';
        let user = users.removeUser(id);
        
        expect(user).toBe(undefined);
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        let user = users.getUser('1');

        expect(user.id).toBe('1');

    });

    it(`should'nt find user`, () => {
        let user = users.getUser('4');
        expect(user).toBe(undefined);
    });

    it('should return names of first', () => {
        let userList = users.getUserList('room1');

        expect(userList).toStrictEqual(["one", "three"]);
    });
    
    it('should return names of second', () => {
        let userList = users.getUserList('room2');
        expect(userList).toStrictEqual(["two"]);
    });
});