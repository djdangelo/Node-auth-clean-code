import {RegisterUserDto} from "../../dto/auth/register-user.dto";
import {AuthRepository} from "../../repositories/auth.repository";
import {JwtAdapter} from "../../../config";
import {CustomError} from "../../errors/custom.error";
import {SingToken} from "../../@types/sing-token.type";
import {UserResponse} from "../../interfaces/user-response.interface";

interface RegisterUserUseCase {
    execute(registerUserDto: RegisterUserDto): Promise<UserResponse>;
}

export class RegisterUser  implements RegisterUserUseCase {

    constructor(private readonly authRepository: AuthRepository,
                private readonly singToken: SingToken = JwtAdapter.generateToken) {
    }

    async execute(registerUserDto: RegisterUserDto): Promise<UserResponse> {
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