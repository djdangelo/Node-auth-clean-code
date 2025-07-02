import {AuthRepository} from "../../repositories/auth.repository";
import {JwtAdapter} from "../../../config";
import {CustomError} from "../../errors/custom.error";
import {LoginUserDto} from "../../dto/auth/login-user.dto";
import {SingToken} from "../../@types/sing-token.type";
import {UserResponse} from "../../interfaces/user-response.interface";

interface LoginUserUseCase {
    execute(loginUserDto: LoginUserDto): Promise<UserResponse>;
}

export class LoginUser implements LoginUserUseCase {

    constructor(private readonly authRepository: AuthRepository,
                private readonly singToken: SingToken = JwtAdapter.generateToken) {
    }

    async execute(loginUserDto: LoginUserDto): Promise<UserResponse> {
        const user = await this.authRepository.login(loginUserDto);
        const token = await this.singToken({id: user.id}, '2h') || '';
        if (!token) {
            throw CustomError.internalServerError('Unable to login user');
        }
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        }
    }

}