import { Request, Response } from 'express';
import {AuthRepository, CustomError, RegisterUserDto} from "../../domain";


export class AuthController {
    constructor(
        private readonly authRepository: AuthRepository,
    ) {
    }
    private handleError = ( error: unknown, res: Response ) => {
        if ( error instanceof CustomError ) {
            return res.status(error.code).json({ error: error.message });
        }

        console.log(error); // Winston
        return res.status(500).json({ error: 'Internal Server Error' });
    }
    register = (req: Request, res: Response)=> {
        const [ error, registerUserDto ]= RegisterUserDto.create(req.body);

        if (error) return res.status(400).json({error});

        this.authRepository.register(registerUserDto!)
            .then(user => res.status(200).json({user}))
            .catch(err => this.handleError(error, res) );
    }
    login = (req: Request, res: Response)=> {
        res.json('Register controller');
    }

}