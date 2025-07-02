export interface UserResponse {
    token: string;
    user: User
}
interface User {
    id: string,
    name: string,
    email: string,
}