import * as express from 'express'; 
import { Request, Response} from 'express'; 
import IControllerBase from '../interfaces/IControllerBase';
import UserBank from 'Models/UserBank';
import Book from 'Models/Book';

class NewBookController implements IControllerBase {
    //Members
    public path = '/user/:username/newBook'; 
    public router = express.Router(); 
    public userBank : UserBank;


    //Constructor:
   constructor(userBank : UserBank) {
    this.userBank = userBank; 
    this.initRoutes()
    }

    //New Book POST Route: 
    newBook = (req : Request, res : Response) => {
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
             //Create a new book for user and handle unexpected errors:
            try {
                const user = this.userBank.findUser(username);
                user.addBook(title, author); 
                res.json({message : `Book ${title}, by ${author} successful added to ${username}'s list`, code : 200});
            } catch (error) {
                res.json({message : `An unexpected error occurred on the server: ${error.message}`, code: 500});
            }
        }
       
    }


    //Initialize Routes: 
    public initRoutes() {
        this.router.post('/user/:username/newBook', this.newBook); 
    } 
}

export default NewBookController; 