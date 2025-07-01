import {CustomError, UserEntity} from "../../domain";

export class UserMapper {
    static userEntityFromObject(object: {[key: string]: any}) {
        const { id, _id, name, email, password, roles } = object;
        if (!id || !_id) {
            throw CustomError.badRequest(`User Mapper does not exist with id ${id}`);
        }
        if (!email) {
            throw CustomError.badRequest(`User Mapper does not exist with email ${email}`);
        }
        if (!password) {
            throw CustomError.badRequest(`Missing password`);
        }
        if (!roles) {
            throw CustomError.badRequest('Missing role');
        }
        if (!name) {
            throw CustomError.badRequest(`Missing name`);
        }
        return new UserEntity(
            _id || id,
            email,
            name,
            password,
            roles,
        );
    }
}