import App from './app'; 

//Middleware:  
import * as bodyParser from 'body-parser'; 
import loggerMiddleware from './middleware/logger'; 

//Controllers:
import HomeController from './controllers/homeController';
import GetBooksController from './controllers/getBooksController';
import newBookController from './controllers/newBookController';
import EditBookController from './controllers/editBookController';
import DeleteBookController from './controllers/deleteBookController';
import NewUserController from './controllers/newUserController';

//"Database": 
import UserBank from 'Models/UserBank';


//"DataBase": 
const userBank = new UserBank(); 

//App: 
const app = new App({
    port: 5000,
    controllers: [
        new HomeController(userBank),
        new GetBooksController(userBank),
        new newBookController(userBank),  
        new EditBookController(userBank),
        new DeleteBookController(userBank),
        new NewUserController(userBank),
        
    ],
    middleWares: [
        bodyParser.json(), 
        bodyParser.urlencoded({ extended: true}),
        loggerMiddleware
    ]
})


app.listen();