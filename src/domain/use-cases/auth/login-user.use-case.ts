import {AuthRepository} from "../../repositories/auth.repository";
import {JwtAdapter} from "../../../config";
import {CustomError} from "../../errors/custom.error";
import {LoginUserDto} from "../../dto/auth/login-user.dto";

type SingToken = (payload: Object, duration?: string) => Promise<string|null>;


interface LoginUserUseCase {
    execute(loginUserDto: LoginUserDto): Promise<UserToken>;
}

interface UserToken {
    token: string;
    user: {
        email: string;
        id: string;
        name: string;
    }
}

export class LoginUser implements LoginUserUseCase {

    constructor(private readonly authRepository: AuthRepository,
                private readonly singToken: SingToken = JwtAdapter.generateToken) {
    }

    async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
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