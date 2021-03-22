import * as express from 'express'; 
import { Request, Response} from 'express'; 
import UserBank from 'Models/UserBank';
import IControllerBase from '../interfaces/IControllerBase';


class HomeController implements IControllerBase {

    //Members
    public path = '/'; 
    public router = express.Router(); 
    public userBank : UserBank;  


    //Route programming is defined here: (Define utility methods in the controller class here).  
    testResponse = (req: Request, res: Response) => {
        try {
            const testResponse = "this works"; 
            res.json({message : testResponse, code: 200}); 
        }   catch (error) {
            res.json({message: "Something went wrong", code: 500})
        }
    }

    //Constructor: 
    constructor(userbank : UserBank) {
        this.userBank = userbank; 
        this.initRoutes(); 
    }

    //Formalizes route definition according to HTTP Verb: 
    public initRoutes() {
        this.router.get('/', this.testResponse); 
    }
}

export default HomeController; 