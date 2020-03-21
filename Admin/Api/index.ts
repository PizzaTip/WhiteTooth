import { AdminApi } from './Api';
import { RequestRepository } from '../../Core/Repositories/Adapters/RequestFileSystemRepository';
import { EnvironmentRepository } from '../../Core/Repositories/Adapters/EnvironmentFileSystemRepository';

const port = process.env.PORT || '3100';

// create repositries
const requestRepository: RequestRepository = new RequestRepository();
const environmentRepository: EnvironmentRepository = new EnvironmentRepository();

const adminApi = new AdminApi(port, requestRepository, environmentRepository);
adminApi.start();
