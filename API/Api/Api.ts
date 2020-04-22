import express = require('express');
import _ = require('lodash');
import { IRequestRepository } from '../../Core/Repositories/Ports/IRequestRepository';

class WhiteToothAPI implements IWhiteToothAPI {
    private readonly _port: number;
    private readonly _requestRepository: IRequestRepository;

    constructor(port: number, requestRepository: IRequestRepository) {
        this._port = port;
        this._requestRepository = requestRepository;
    }

    start() {
        const app: express.Application = express();

        app.get('*', (req: express.Request, res: express.Response) => {
            try {
                const url = this.parseRequestURL(req.url);

                const request = this._requestRepository.getByUrlAndMethod(url, 'GET');
                console.log(request);
                const response = request.response;
                res.status(response.status);
                for (let [headerName, headerValue] of Object.entries(response.headers))
                    res.setHeader(headerName, headerValue);

                res.send(response.body);
            } catch (e) {
                res.status(500).send(e);
            }
        });

        app.listen(this._port, () =>
            console.log(`WhiteTooth API is listening on port ${this._port}!`)
        );
    }

    parseRequestURL(url: string): string {
        const urlParts = url.split('/');
        if (urlParts.length < 2)
            throw new Error('Bad url format - should be: `/endpoint`');

        return urlParts[1]
    }
}

interface IWhiteToothAPI {
    start: () => void;
    parseRequestURL: (url: string) => string;
}

export { WhiteToothAPI, IWhiteToothAPI };
