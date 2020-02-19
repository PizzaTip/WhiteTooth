import express = require('express');
const app: express.Application = express();
const port = 3000;

app.get('*', (req: express.Request, res: express.Response) => {
    res.send(`Called URL ${req.url}`);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
