import * as express from 'express'; 
import { Request, Response} from 'express'; 
import IControllerBase from '../interfaces/IControllerBase';
import UserBank from 'Models/UserBank';

class NewUserController implements IControllerBase {
    //Members
    public path = '/user/:newUsername'; 
    public router = express.Router(); 
    public userBank : UserBank;
 
 
    //Constructor:
    constructor(userBank : UserBank) {
        this.userBank = userBank; 
        this.initRoutes()
    }

    //New User POST Route: 
    newUser = (req : Request, res : Response) => {
        const newUsername = req.params.newUsername;

        //Validation Check 1: Blank usernames or undefined usernames: 
        if (!newUsername || newUsername === "") {
            res.json({message : "Username was not properly entered or is blank", code : 422}); 
        }

        else {
            //Create user and catch unexpected errors: 
            try {
                this.userBank.addUser(newUsername);
                res.json({message : `New User ${newUsername} has been sucessfully added to the database`, code : 200});
            } catch (error) {
                res.json({message : `An unexpected error occurred on the server: ${error.message}`, code : 500});
            }
        }
    }

    //Initialize Routes: 
    public initRoutes() {
        this.router.post('/user/:newUsername', this.newUser); 
    }  
}

export default NewUserController;