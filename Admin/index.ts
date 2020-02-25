import express = require('express');
import environmentRepositoryAdapter = require('./Adapters/FileSystem/EnvironmentRepository');
const environmentRepository: environmentRepositoryAdapter.EnvironmentRepository = new environmentRepositoryAdapter.EnvironmentRepository();
import requestRepositoryAdapter = require('./Adapters/FileSystem/RequestRepository');
const requestRepository: requestRepositoryAdapter.RequestRepository = new requestRepositoryAdapter.RequestRepository();
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
    let environment = environmentRepository.getEnvironmentByName(
      environmentName
    );
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
app.get(
  '/environments',
  async (req: express.Request, res: express.Response) => {
    let environments = await environmentRepository.getAllEnvironments();
    res.setHeader('Content-Type', 'application/json');
    res.send(environments).end();
  }
);

/**
 * Get all requests
 */
app.get('/requests', (req: express.Request, res: express.Response) => {
  res.setHeader('Content-Type', 'application/json');
  let content = requestRepository.getAllRequests();
  res.send(content);
});

/**
 * If non of the links suits, return 404
 */
app.get('*', (req: express.Request, res: express.Response) => {
  res.status(404).send('Not found');
});

app.listen(port, () =>
  console.log(`WhiteTooth Admin is listening on port ${port}!`)
);
