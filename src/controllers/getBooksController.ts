import * as express from 'express'; 
import { Request, Response} from 'express'; 
import IControllerBase from '../interfaces/IControllerBase';
import UserBank from 'Models/UserBank';


class GetBooksController implements IControllerBase {
    //Members
    public path = '/user/:username/getBooks'; 
    public router = express.Router(); 
    public userBank : UserBank;
    

    //Constructor:
   constructor(userBank : UserBank) {
        this.userBank = userBank; 
        this.initRoutes()
   }

   //GET Route: Get books for a specified user 
   getBooks = (req : Request, res : Response) => {
        const username = req.params.username; 

        //Validation 1: Check for erroneous / blank username: 
        if (!username || username === '') {
            res.json({message : 'username is blank, no user exists', code: 404})
        } 

        //Retrieve books and handle additional unexpected errors: 
        try {
            const user = this.userBank.findUser(username);
            res.json({books : user.getBookList(), message: `Here are ${username}'s books`, code : 200});
        } catch (error) {
            res.json({message : `An unexpected error occurred on the server: ${error.message}`, code: 500});
        }
    }


    //Initialize Routes: 
    public initRoutes() {
        this.router.get('/user/:username/getBooks', this.getBooks); 
    } 
}

export default GetBooksController; 