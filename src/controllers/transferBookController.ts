import * as express from 'express'; 
import { Request, Response} from 'express'; 
import IControllerBase from '../interfaces/IControllerBase';
import UserBank from 'Models/UserBank';
import Book from 'Models/Book';

class TransferBookController implements IControllerBase {
   //Members
   public path = '/user/:username/transferBook'; 
   public router = express.Router(); 
   public userBank : UserBank;


   //Constructor:
   constructor(userBank : UserBank) {
        this.userBank = userBank; 
        this.initRoutes()
    }

    //Book Transfer Post Route: 
    transferBook = (req : Request, res : Response) => {
        const transfererName = req.params.username; 
        const transfereeName = req.body.transfereeName; 
        const transferTitle = req.body.title; 
        const transferAuthor = req.body.author; 
        const tranferer = this.userBank.findUser(transfererName); 
        const transferee = this.userBank.findUser(transfereeName);


        //Validation Check 1: Validate usernames of transfererName and transfereeName: 
        if ((!transfererName || transfererName === "") || (!transfereeName || transfereeName === "")) {
            res.json({message : "Transferer / TransfereeName usernames are either blank or wrong", code : 422});
        }
        
        //Validation Check 2: See if the book can be found
        else if (!tranferer || !transferee) {
            res.json({message : "No transferer or transferee user found", code : 404}); 
        }

        //Validation Check 3: Validate Book title: 
        else if (Book.validateBook(transferTitle, transferAuthor)) {
            res.json({message : "Book title / author are either blank or wrong", code : 422});
        }

        //Transfer book from Transferer to Transferee and handle errors: 
        else {
            try {
                tranferer.transferBook(transferee, transferTitle, transferAuthor);
                res.json({message : `Book ${transferTitle}, by ${transferAuthor} was transferred to ${transfereeName}`, code : 200})
            } catch (error) {
                res.json({message : `An unexpected error occurred on the server: ${error.message}`, code : 500});
            }
        }
}   


    //Initialize Routes: 
    public initRoutes() {
        this.router.get('/user/:username/getBooks', this.transferBook); 
    } 
}

export default TransferBookController;