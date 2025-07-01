import {AuthDatasource, CustomError, RegisterUserDto, UserEntity} from "../../domain";
import {BcryptAdapter} from "../../config";
import {UserModel} from "../../data";
import {UserMapper} from "../mappers/user.mapper";
import {LoginUserDto} from "../../domain/dto/auth/login-user.dto";
type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {
    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
    ) {}
    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const { name, email, password } = registerUserDto;
        try {
            const exists = await UserModel.findOne({ email });
            if ( exists ) throw CustomError.badRequest('User already exists');

            const user = await UserModel.create({
                name: name,
                email: email,
                password: this.hashPassword( password ),
            });


            await user.save();

            return UserMapper.userEntityFromObject(user);
        } catch (e) {
            if (e instanceof CustomError) {
                throw e;
            }
            throw CustomError.internalServerError();
        }
    }
    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const { email, password } = loginUserDto;
        try {
            const user = await UserModel.findOne({ email });
            if (!user) throw CustomError.badRequest('User not found.');
            if (!this.comparePassword(password, user.password)) throw CustomError.unauthorized('Invalid password/email');
            return UserMapper.userEntityFromObject(user);
        } catch (e) {
            if (e instanceof CustomError) {
                throw e;
            }
            throw CustomError.internalServerError();
        }
    }

}