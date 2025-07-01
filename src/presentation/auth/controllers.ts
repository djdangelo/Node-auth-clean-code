import { Request, Response } from 'express';
import {AuthRepository, CustomError, LoginUser, RegisterUser, RegisterUserDto} from "../../domain";
import {UserModel} from "../../data";
import {LoginUserDto} from "../../domain/dto/auth/login-user.dto";


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

        new RegisterUser(this.authRepository)
            .execute(registerUserDto!)
            .then(user => res.status(201).json({user}))
            .catch(error => this.handleError(error, res))
    }
    login = (req: Request, res: Response)=> {
        const [ error, loginUserDto ]= LoginUserDto.create(req.body);
        if (error) return res.status(400).json({error});
        new LoginUser(this.authRepository)
            .execute(loginUserDto!)
            .then(user => res.status(201).json({user}))
            .catch(error => this.handleError(error, res));
    }

    getUsers = (req: Request, res: Response) => {
        UserModel.find().then((users: any) => res.status(200).json(users)).catch((err: unknown) => this.handleError(err, res) );
    }

}