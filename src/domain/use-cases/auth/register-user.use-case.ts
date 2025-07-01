import {RegisterUserDto} from "../../dto/auth/register-user.dto";
import {AuthRepository} from "../../repositories/auth.repository";
import {JwtAdapter} from "../../../config";
import {CustomError} from "../../errors/custom.error";

type SingToken = (payload: Object, duration?: string) => Promise<string|null>;


interface RegisterUserUseCase {
    execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
}

interface UserToken {
    token: string;
    user: {
        email: string;
        id: string;
        name: string;
    }
}

export class RegisterUser  implements RegisterUserUseCase {

    constructor(private readonly authRepository: AuthRepository,
                private readonly singToken: SingToken = JwtAdapter.generateToken) {
    }

    async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
        const user = await this.authRepository.register(registerUserDto);
        const token = await this.singToken({id: user.id}, '2h') || '';
        if (!token) {
            throw CustomError.internalServerError('Unable to register user');
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