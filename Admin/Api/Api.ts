import express = require('express');
import IEnvironmentRepository = require('../../Core/Repositories/Ports/IEnvironmentRepository');
import IRequestRepository = require('../../Core/Repositories/Ports/IRequestRepository');
import { Request } from '../../Core/Models/request';
import { v1 as uuidv1 } from 'uuid';

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
    app.use(express.json());
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
     * Get specific request
     */
    app.get('/request/:id', (req: express.Request, res: express.Response) => {
      const id = req.params.id;

      try {
        const request = this._requestRepository.get(id);
        if (!request) {
          res
            .status(404)
            .send('Request object not found')
            .end();
        }
        res
          .header('Content-Type', 'application/json')
          .send(request)
          .end();
      } catch (e) {
        res
          .status(500)
          .send(e)
          .end();
      }

      res.end();
    });

    /**
     * Updates specific request
     */
    app.put('/request/:id', (req: express.Request, res: express.Response) => {
      const id = req.params.id;
      const name = req.body.name;
      const relativePath = req.body.relativePath;

      // validate all inputs supplied
      if (!name || !relativePath) {
        res.statusCode = 500;
        res.send({ error: 'Sorry, Missing parameter', success: false }).end();
      }

      const request = new Request(id, relativePath, name);
      try {
        this._requestRepository.update(request);
        res.send({ error: '', success: true }).end();
      } catch (e) {
        res
          .status(500)
          .send(e)
          .end();
      }

      res.end();
    });

    /*
     * Adds new request
     */
    app.post('/request', (req: express.Request, res: express.Response) => {
      const name = req.body.name;
      const relativePath = req.body.relativePath;

      // validate all inputs supplied
      if (!name || !relativePath) {
        res.statusCode = 500;
        res.send({ error: 'Sorry, Missing parameter', success: false }).end();
      }

      const request = new Request(uuidv1(), relativePath, name);
      try {
        this._requestRepository.add(request);
        res.send({ error: '', success: true }).end();
      } catch (e) {
        res
          .status(500)
          .send(e)
          .end();
      }

      res.end();
    });

    /**
     * Delete request
     */
    app.delete(
      '/request/:id',
      (req: express.Request, res: express.Response) => {
        const id = req.params.id;

        if (!id) {
          res
            .status(500)
            .send({ error: 'Sorry, Missing parameter: id', success: false })
            .end();
        }

        try {
          this._requestRepository.remove(id);
          res.send({ error: '', success: true }).end();
        } catch (e) {
          res
            .status(500)
            .send(e)
            .end();
        }

        res.end();
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
