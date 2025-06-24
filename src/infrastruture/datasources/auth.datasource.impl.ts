import {AuthDatasource, CustomError, RegisterUserDto, UserEntity} from "../../domain";

export class AuthDatasourceImpl implements AuthDatasource {
    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const { name, email, password } = registerUserDto;
        try {
            return new UserEntity(
                '1',
                email,
                name,
                password,
                ['admin']
            )
        } catch (e) {
            if (e instanceof CustomError) {
                throw e;
            }
            throw CustomError.internalServerError();
        }
    }

}