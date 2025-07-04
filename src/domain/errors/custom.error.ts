export class CustomError extends Error {
    constructor(
        public readonly message: string,
        public readonly code: number,
    ) {
        super(message);
    }

    static badRequest(message:string) {
        return new CustomError(message, 400);
    }
    static unauthorized(message:string) {
        return new CustomError(message, 401);
    }
    static forbidden(message:string) {
        return new CustomError(message, 403);
    }
    static notFound(message:string) {
        return new CustomError(message, 404);
    }
    static internalServerError(message:string = 'Internal Server Error') {
        return new CustomError(message, 500);
    }
}