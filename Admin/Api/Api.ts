import express = require('express');
import IEnvironmentRepository = require('../../Core/Repositories/Ports/IEnvironmentRepository');
import IRequestRepository = require('../../Core/Repositories/Ports/IRequestRepository');

class AdminApi {
  private readonly _port: number;
  private readonly _environmentRepository: IEnvironmentRepository.IEnvironmentRepository;
  private readonly _requestRepository: IRequestRepository.IRequestRepository;

  constructor(
    port: number,
    requestRepository: IRequestRepository.IRequestRepository,
    envirnemntRepository: IEnvironmentRepository.IEnvironmentRepository
  ) {
    this._port = port;
    this._environmentRepository = envirnemntRepository;
    this._requestRepository = requestRepository;
  }

  start() {
    const app: express.Application = express();
    /**
     * Get specific environment
     */
    app.get(
      '/environment/:environmentName',
      (req: express.Request, res: express.Response) => {
        const environmentName = req.params.environmentName;
        res.setHeader('Content-Type', 'application/json');
        let environment = this._environmentRepository.getEnvironmentByName(
          environmentName
        );
        if (environment) {
          res.setHeader('Content-Type', 'application/json');
          res.send(environment).end();
        } else {
          res.setHeader('Content-Type', 'text/plain');
          res
            .status(404)
            .send(
              `Sorry, No environment found with the name ${environmentName}`
            )
            .end();
        }
      }
    );

    /**
     * Get all environments
     */
    app.get(
      '/environments',
      async (req: express.Request, res: express.Response) => {
        let environments = await this._environmentRepository.getAllEnvironments();
        res.setHeader('Content-Type', 'application/json');
        res.send(environments).end();
      }
    );

    /**
     * Get all requests
     */
    app.get('/requests', (req: express.Request, res: express.Response) => {
      res.setHeader('Content-Type', 'application/json');
      let content = this._requestRepository.getAllRequests();
      res.send(content);
    });

    /**
     * If non of the links suits, return 404
     */
    app.get('*', (req: express.Request, res: express.Response) => {
      res.status(404).send('Not found');
    });

    app.listen(this._port, () =>
      console.log(`WhiteTooth Admin is listening on port ${this._port}!`)
    );
  }
}

export { AdminApi };
