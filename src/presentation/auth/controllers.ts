import { Request, Response } from 'express';
import {AuthRepository, CustomError, RegisterUserDto} from "../../domain";
import {JwtAdapter} from "../../config";
import {UserModel} from "../../data";


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
            .then(async (user) => res.status(200).json({user, token: await JwtAdapter.generateToken({id: user.id})}))
            .catch(err => this.handleError(error, res) );
    }
    login = (req: Request, res: Response)=> {
        res.json('Register controller');
    }

    getUsers = (req: Request, res: Response) => {
        UserModel.find().then((users: any) => res.status(200).json(users)).catch((err: unknown) => this.handleError(err, res) );
    }

}