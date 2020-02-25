import express = require('express');
const app: express.Application = express();
const port = 3000;

class APIRunner {
    //private readonly _environment: Environment;
    private readonly _port: number;
    constructor(port: number) {
        this._port = port;
        this.run();
    }
    private run() {
        app.get('*', (req: express.Request, res: express.Response) => {
            res.send(`Called URL ${req.url}`);
        });

        app.listen(port, () => console.log(`WhiteTooth API is listening on port ${this._port}!`));
    }
}

let x = new APIRunner(port);

