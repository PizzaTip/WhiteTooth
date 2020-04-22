import { Request } from '../../Models/request';

interface IRequestRepository {
    add(request: Request): void;
    remove(id: string): void;
    get(id: string): Request | undefined;
    getByUrlAndMethod(url: string, method: string): Request | never;
    update(request: Request): void;
    getAllRequests(): Request[];
}

export { IRequestRepository };
