import {Router} from "express";
import {AuthController} from "./controllers";

export class AuthRoutes {
    static get routes(): Router {

        const routes =  Router();
        const controller = new AuthController();

        routes.post('/login', controller.login);
        routes.post('/register', controller.register);
        return routes;
    }
}