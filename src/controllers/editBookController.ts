import * as express from 'express'; 
import { Request, Response} from 'express'; 
import IControllerBase from '../interfaces/IControllerBase';
import UserBank from 'Models/UserBank';
import Book from 'Models/Book';


class EditBookController implements IControllerBase {
    //Members
    public path = '/user/:username/editBook'; 
    public router = express.Router(); 
    public userBank : UserBank;
 
 
    //Constructor:
    constructor(userBank : UserBank) {
        this.userBank = userBank; 
        this.initRoutes()
    }


    //Edit Book PATCH Route: 
    editBook = (req : Request, res : Response) => {
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
             //Update a book for user and handle unexpected errors:
            try {
                const user = this.userBank.findUser(username);
                user.updateBookInfo(title, author);
                res.json({message : `Book ${title}, by ${author} sucessfully updated in ${username}'s book list`, code : 200});
            } catch (error) {
                res.json({message : `An unexpected error occurred on the server: ${error.message}`, code: 500});
            }
        }
    }


    //Initialize Routes: 
    public initRoutes() {
        this.router.patch('/user/:username/editBook', this.editBook); 
    }  
}

export default EditBookController; 