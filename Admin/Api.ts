import express, { Request, Response } from 'express';
import cors from 'cors';
import { IRequestRepository } from '../Core/Repositories/Ports/IRequestRepository';
import { requestRouter } from './routers/RequestRouter';
import { authenticationRouter } from './routers/AuthenticationRouter';
import { RequestFileSystemRepository } from '../Core/Repositories/Adapters/RequestFileSystemRepository';
import { appConfig } from '../Config/globalConfig';

class AdminApi {
    private readonly _port: string;
    private readonly _requestRepository: IRequestRepository;

    constructor(port: string, requestRepository: IRequestRepository) {
        this._port = port;
        this._requestRepository = requestRepository;
    }

    start() {
        const app: express.Application = express();
        app.use(express.json());
        app.use(cors());
        app.use(requestRouter(this._requestRepository));
        app.use(authenticationRouter());

        // If non of the links suits, return 404
        app.get('*', (req: Request, res: Response) => {
            res.status(404).send('Not found');
        });

        app.listen(this._port, () =>
            console.log(`WhiteTooth Admin is listening on port ${this._port}!`)
        );
    }
}

const port = process.env.PORT || appConfig.adminserver.port;

// create repositries
const requestRepository: RequestFileSystemRepository = new RequestFileSystemRepository();
const adminApi = new AdminApi(port, requestRepository);
adminApi.start();
