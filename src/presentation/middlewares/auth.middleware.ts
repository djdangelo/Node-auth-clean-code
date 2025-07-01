import {NextFunction, Request, Response} from "express";
import {JwtAdapter} from "../../config";
import {UserModel} from "../../data";

export class AuthMiddleware {
    static async validateJWT(req: Request, res: Response, next: NextFunction) {
        const autorization = req.header('Authorization');
        if (!autorization) return res.status(401).json({error: 'Not token provided'});
        if (!autorization.startsWith('Bearer ')) return res.status(401).json({error: 'Invalid Token.'});
        const token = autorization.split(' ');
        try {
            const decoded = await JwtAdapter.validateToken<{id: string}>(token[1]);
            if (!decoded) return res.status(401).json({error: 'Invalid Token provided'});

            const user = await UserModel.findById(decoded.id);
            if (!user) return res.status(500).json({error: 'Internal Server Error'});

            req.body.user = user;

        } catch (e) {
            console.error(e);
            res.status(500).json({error: 'internal error'});
        }
        next();
    }
}