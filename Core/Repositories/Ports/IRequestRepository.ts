import { Request } from '../../Models/request';

interface IRequestRepository {
  add(request: Request): void;
  remove(id: string): void;
  get(id: string): Request | undefined;
  getAllRequests(): Request[];
}

export { IRequestRepository };
