import express = require('express');
import fsDal = require('./Adapters/FileSystem/fsDal');
const dal: fsDal.FileSystemDal = new fsDal.FileSystemDal();
const app: express.Application = express();
const port = 3100;

/**
 * Get specific environment
 */
app.get(
  '/environment/:environmentName',
  (req: express.Request, res: express.Response) => {
    const environmentName = req.params.environmentName;
    res.setHeader('Content-Type', 'application/json');
    let environment = dal.getEnvironmentByName(environmentName);
    if (environment) {
      res.setHeader('Content-Type', 'application/json');
      res.send(environment).end();
    } else {
      res.setHeader('Content-Type', 'text/plain');
      res
        .status(404)
        .send(`Sorry, No environment found with the name ${environmentName}`)
        .end();
    }
  }
);

/**
 * Get all environments
 */
app.get('/environments', (req: express.Request, res: express.Response) => {
  let environments = dal.getAllEnvironments();
  res.setHeader('Content-Type', 'application/json');
  res.send(environments).end();
});

/**
 * Get all requests
 */
app.get('/requests', (req: express.Request, res: express.Response) => {
  res.setHeader('Content-Type', 'application/json');
  let content = dal.getAllRequests();
  res.send(content);
});

/**
 * if non of the links firs, return 404
 */
app.get('*', (req: express.Request, res: express.Response) => {
  res.status(404).send('Not found');
});

app.listen(port, () =>
  console.log(`WhiteTooth Admin is listening on port ${port}!`)
);
