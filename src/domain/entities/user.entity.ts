export class UserEntity {
    constructor(
        public id: string,
        public email: string,
        public name: string,
        public password: string,
        public roles: string[],
        public img?: string,
    ) {
    }
}