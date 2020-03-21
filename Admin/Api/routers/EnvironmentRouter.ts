import { Request, Response, Router } from 'express';
import { IEnvironmentRepository } from '../../../Core/Repositories/Ports/IEnvironmentRepository';

export function environmentRouter(repository: IEnvironmentRepository): Router {
  let router: Router = Router();
  const routePath = 'environment';

  // Get Spcific environment
  router.get(
    `/${routePath}/:environmentName`,
    (req: Request, res: Response) => {
      const environmentName = req.params.environmentName;
      res.setHeader('Content-Type', 'application/json');
      let environment = repository.getEnvironmentByName(environmentName);
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

  // Get all environments
  router.get(`/${routePath}`, async (req: Request, res: Response) => {
    let environments = await repository.getAllEnvironments();
    res.setHeader('Content-Type', 'application/json');
    res.send(environments).end();
  });

  return router;
}
