import {UserEntity} from "../entities/user.entity";
import {RegisterUserDto} from "../dto/auth/register-user.dto";
import {LoginUserDto} from "../dto/auth/login-user.dto";

export abstract class AuthDatasource {
    abstract register(registerUserDto:RegisterUserDto): Promise<UserEntity>;
    abstract login(loginUserDto:LoginUserDto): Promise<UserEntity>;
}