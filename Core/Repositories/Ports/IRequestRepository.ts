import { Request } from '../../Models/request';

interface IRequestRepository {
  add(request: Request): void;
  remove(requestPath: string): void;
  get(requestPath: string): void;
  getAllRequests(): Request[];
}

export { IRequestRepository };
