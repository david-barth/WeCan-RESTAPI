import {Request, Response} from 'express'; 

const loggerMiddleWare = (req: Request, resp: Response, next) => {
    console.log(`A ${req.method} request was logged on path ${req.path}`);
    next(); 
}

export default loggerMiddleWare;