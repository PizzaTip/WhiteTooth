import express = require('express');
import IEnvironmentRepository = require('../../Core/Repositories/Ports/IEnvironmentRepository');

class WhiteToothAPI {
    private readonly _port: number;
    private readonly _environmentRepository: IEnvironmentRepository.IEnvironmentRepository;

    constructor(
        port: number,
        envirnemntRepository: IEnvironmentRepository.IEnvironmentRepository
    ) {
        this._port = port;
        this._environmentRepository = envirnemntRepository;
    }

    start() {
        const app: express.Application = express();

        app.get('*', (req: express.Request, res: express.Response) => {
            try {
                const parsedURL = this.parseRequestURL(req.url);
                const environment = JSON.parse(this._environmentRepository.getEnvironmentByName(parsedURL.environment));
                const response = environment.responses[parsedURL.url];
                if (response)
                    res.send(response);
                else
                    res.status(404).send("Not Found");
            }
            catch (e){
                res.status(500).send(e);
            }
        });

        app.listen(this._port, () => console.log(`WhiteTooth API is listening on port ${this._port}!`));
    }

    parseRequestURL(url: string): ParsedRequest {
        const urlParts = url.split("/");
        if (urlParts.length !== 3)
            throw "Bad url format - should be: `environment/endpoint`";

        const result =  {
            environment: urlParts[1],
            url: `/${urlParts[2]}`
        }

        return result;
    }
}

interface ParsedRequest {
    environment: string,
    url: string
}

export { WhiteToothAPI }