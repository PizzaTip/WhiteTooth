import { AdminApi } from './Api';
import { RequestFileSystemRepository } from '../../Core/Repositories/Adapters/RequestFileSystemRepository';

const port = process.env.PORT || '3100';

// create repositries
const requestRepository: RequestFileSystemRepository = new RequestFileSystemRepository();
const adminApi = new AdminApi(port, requestRepository);
adminApi.start();
