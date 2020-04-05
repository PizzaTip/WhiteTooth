import express, { Request, Response } from 'express';
import { IEnvironmentRepository } from '../../Core/Repositories/Ports/IEnvironmentRepository';
import { IRequestRepository } from '../../Core/Repositories/Ports/IRequestRepository';
import { environmentRouter } from './routers/EnvironmentRouter';
import { requestRouter } from './routers/RequestRouter';

class AdminApi {
  private readonly _port: string;
  private readonly _environmentRepository: IEnvironmentRepository;
  private readonly _requestRepository: IRequestRepository;

  constructor(
    port: string,
    requestRepository: IRequestRepository,
    envirnemntRepository: IEnvironmentRepository
  ) {
    this._port = port;
    this._environmentRepository = envirnemntRepository;
    this._requestRepository = requestRepository;
  }

  start() {
    const app: express.Application = express();
    app.use(express.json());
    app.use(environmentRouter(this._environmentRepository));
    app.use(requestRouter(this._requestRepository));

    // If non of the links suits, return 404
    app.get('*', (req: Request, res: Response) => {
      res.status(404).send('Not found');
    });

    app.listen(this._port, () =>
      console.log(`WhiteTooth Admin is listening on port ${this._port}!`)
    );
  }
}

export { AdminApi };
