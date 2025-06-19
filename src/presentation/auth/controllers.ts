import { Request, Response } from 'express';


export class AuthController {
    constructor() {
    }
    register = (req: Request, res: Response)=> {
        res.json('Login controller');
    }
    login = (req: Request, res: Response)=> {
        res.json('Register controller');
    }

}