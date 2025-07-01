import {Router} from "express";
import {AuthController} from "./controllers";
import {AuthDatasourceImpl, AuthRepositoryImp} from "../../infrastruture";
import {AuthMiddleware} from "../middlewares/auth.middleware";

export class AuthRoutes {
    static get routes(): Router {

        const database = new AuthDatasourceImpl();
        const authRepository = new AuthRepositoryImp(database);

        const routes =  Router();
        const controller = new AuthController(authRepository);

        routes.post('/login', controller.login);
        // @ts-ignore
        routes.post('/register', controller.register);
        // @ts-ignore
        routes.get('/',AuthMiddleware.validateJWT, controller.getUsers);
        return routes;
    }
}