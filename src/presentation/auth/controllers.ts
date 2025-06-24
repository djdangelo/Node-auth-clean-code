import { Request, Response } from 'express';
import {AuthRepository, RegisterUserDto} from "../../domain";


export class AuthController {
    constructor(
        private readonly authRepository: AuthRepository,
    ) {
    }
    register = (req: Request, res: Response)=> {
        const [ error, registerUserDto ]= RegisterUserDto.create(req.body);

        if (error) return res.status(400).json({error});

        this.authRepository.register(registerUserDto!)
            .then(user => res.status(200).json({user}))
            .catch(err => res.status(500).json({error}));
    }
    login = (req: Request, res: Response)=> {
        res.json('Register controller');
    }

}