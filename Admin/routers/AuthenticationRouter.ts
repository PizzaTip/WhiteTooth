import { Request, Response, Router } from 'express';
import { appConfig } from '../../Config/globalConfig';

export function authenticationRouter() {
    let router: Router = Router();

    // Create new request
    router.post(`/${appConfig.adminserver.routes.authentication}`, (req: Request, res: Response) => {
        const username = req.body.username;
        const password = req.body.password;

        // validate all inputs supplied
        if (!username || !password) {
            res.status(500).send({ error: 'Sorry, Missing parameter' }).end();
        }

        if (username == appConfig.authentication.username && password == appConfig.authentication.password) {
            const token = appConfig.authentication.token;
            res.send({ token }).end();
        }

        res.status(401).send({ error: 'Wrong username or password' });
    });

    return router;
}
