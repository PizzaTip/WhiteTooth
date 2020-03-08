import { Request } from '../../Models/request';

interface IRequestRepository {
  getAllRequests(): Request[];
}

export { IRequestRepository };
