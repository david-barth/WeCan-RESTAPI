import * as express from 'express'; 
import { Request, Response} from 'express'; 
import IControllerBase from '../interfaces/IControllerBase';
import UserBank from 'Models/UserBank';
import Book from 'Models/Book';

class DeleteBookController implements IControllerBase {
    //Members
    public path = '/user/:username/deleteBook'; 
    public router = express.Router(); 
    public userBank : UserBank;
 
 
    //Constructor:
    constructor(userBank : UserBank) {
        this.userBank = userBank; 
        this.initRoutes()
    }


    deleteBook = (req : Request, res : Response) => {
        const username = req.params.username; 
        const author = req.body.author; 
        const title = req.body.title; 
        const bookValidationError = Book.validateBook(title, author);

        //Validation 1: Check for erroneous / blank username: 
        if (!username || username === '') {
            res.json({message : 'username is blank, no user exists', code: 404});
        } 

        //Validation 2: Check for blank / undefined titles + author fields: 
        else if (bookValidationError) {
            res.json(bookValidationError);
        } 


        else {
            //Delete a book for user and handle unexpected errors:
           try {
               const user = this.userBank.findUser(username);
               user.removeBook(title, author);
               res.json({message : `Book ${title}, by ${author} sucessfully deleted from ${username}'s book list`, code : 200});
           } catch (error) {
               res.json({message : `An unexpected error occurred on the server: ${error.message}`, code: 500});
           }
       }
    }

    //Initialize Routes: 
    public initRoutes() {
        this.router.delete('/user/:username/deleteBook', this.deleteBook); 
    }  
}

export default DeleteBookController; 