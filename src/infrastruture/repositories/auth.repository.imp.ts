import {AuthDatasource, AuthRepository, RegisterUserDto, UserEntity} from "../../domain";
import {LoginUserDto} from "../../domain/dto/auth/login-user.dto";

export class AuthRepositoryImp implements AuthRepository {


    constructor(private readonly authDatasource: AuthDatasource) {}

    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.authDatasource.register(registerUserDto);
    }

    login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.authDatasource.login(loginUserDto);
    }
    
}