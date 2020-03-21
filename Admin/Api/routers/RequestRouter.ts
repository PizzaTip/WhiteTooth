import { Request, Response, Router } from 'express';
import { Request as WTRequest } from '../../../Core/Models/request';
import { IRequestRepository } from '../../../Core/Repositories/Ports/IRequestRepository';
import { v1 as uuidv1 } from 'uuid';

export function requestRouter(repository: IRequestRepository) {
  let router: Router = Router();
  const routePath = 'request';

  // Get specific request
  router.get(`/${routePath}/:id`, (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const request = repository.get(id);
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

  // Get all requests
  router.get(`/${routePath}`, (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    let content = repository.getAllRequests();
    res.send(content);
  });

  // Updates specific request
  router.put(`/${routePath}/:id`, (req: Request, res: Response) => {
    const id = req.params.id;
    const name = req.body.name;
    const relativePath = req.body.relativePath;

    // validate all inputs supplied
    if (!name || !relativePath) {
      res.statusCode = 500;
      res.send({ error: 'Sorry, Missing parameter' }).end();
    }

    const request = new WTRequest(id, relativePath, name);
    try {
      repository.update(request);
      res.send(request).end();
    } catch (e) {
      res
        .status(500)
        .send(e)
        .end();
    }

    res.send(request).end();
  });

  // Create new request
  router.post(`/${routePath}`, (req: Request, res: Response) => {
    const name = req.body.name;
    const relativePath = req.body.relativePath;

    // validate all inputs supplied
    if (!name || !relativePath) {
      res.statusCode = 500;
      res.send({ error: 'Sorry, Missing parameter' }).end();
    }

    const request = new WTRequest(uuidv1(), relativePath, name);
    try {
      repository.add(request);
      res.send(request).end();
    } catch (e) {
      res
        .status(500)
        .send(e)
        .end();
    }

    res.send(request).end();
  });

  // Delete a request
  router.delete(`/${routePath}/:id`, (req: Request, res: Response) => {
    const id = req.params.id;

    if (!id) {
      res
        .status(500)
        .send({ error: 'Sorry, Missing parameter: id' })
        .end();
    }

    try {
      repository.remove(id);
      res.send(id).end();
    } catch (e) {
      res
        .status(500)
        .send(e)
        .end();
    }

    res.send(id).end();
  });

  return router;
}
