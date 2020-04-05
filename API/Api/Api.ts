import express = require('express');
import _ = require('lodash');
import { IEnvironmentRepository } from '../../Core/Repositories/Ports/IEnvironmentRepository';

class WhiteToothAPI implements IWhiteToothAPI {
  private readonly _port: number;
  private readonly _environmentRepository: IEnvironmentRepository;

  constructor(port: number, envirnemntRepository: IEnvironmentRepository) {
    this._port = port;
    this._environmentRepository = envirnemntRepository;
  }

  start() {
    const app: express.Application = express();

    app.get('*', (req: express.Request, res: express.Response) => {
      try {
        const { environmentName, url } = this.parseRequestURL(req.url);
        const environment = this._environmentRepository.getEnvironmentByName(
          environmentName
        );

        if (_.isEmpty(environment) || _.isEmpty(environment.responses))
          throw `Environment: ${environmentName} - not found`;

        const response = _.get(environment.responses, `${url}.get`, false);

        if (response) res.send(response);
        else
          res
            .status(404)
            .send(`${url} is not defined under ${environmentName} environment`);
      } catch (e) {
        res.status(500).send(e);
      }
    });

    app.listen(this._port, () =>
      console.log(`WhiteTooth API is listening on port ${this._port}!`)
    );
  }

  parseRequestURL(url: string): ParsedRequest {
    const urlParts = url.split('/');
    if (urlParts.length < 3)
      throw new Error('Bad url format - should be: `environment/endpoint/...`');

    const result = {
      environmentName: urlParts[1],
      url: '/' + urlParts.slice(2).join('/')
    };
    return result;
  }
}

interface ParsedRequest {
  environmentName: string;
  url: string;
}

interface IWhiteToothAPI {
  start: () => void;
  parseRequestURL: (url: string) => ParsedRequest;
}

export { WhiteToothAPI, IWhiteToothAPI, ParsedRequest };
