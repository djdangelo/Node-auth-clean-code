import {Router} from "express";
import {AuthController} from "./controllers";
import {AuthDatasourceImpl, AuthRepositoryImp} from "../../infrastruture";

export class AuthRoutes {
    static get routes(): Router {

        const database = new AuthDatasourceImpl();
        const authRepository = new AuthRepositoryImp(database);

        const routes =  Router();
        const controller = new AuthController(authRepository);

        routes.post('/login', controller.login);
        // @ts-ignore
        routes.post('/register', controller.register);
        return routes;
    }
}