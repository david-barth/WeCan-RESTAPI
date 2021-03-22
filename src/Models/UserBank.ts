import User from 'Models/User';
import { exception } from 'node:console';

class UserBank {
    //Members: 
    public users: User[];
        
    //Constructor: 
    constructor () {
        this.users = new Array(); 
    }


    //Add new User: 
    public addUser (username : string) {
        this.users.push(new User(username));
    }

    //Remove User: 
    public removeUser (username : string) {
        const removedUser = this.users.filter((user) => {
            return user.username === username; 
        })
        return removedUser; 
    }

    //Find User: 
    public findUser (username : string) {
        for (let user of this.users) {
            if (user.username === username)
                return user; 
        }
        throw new exception("No user has been found in the database"); 
    }
}

export default UserBank;