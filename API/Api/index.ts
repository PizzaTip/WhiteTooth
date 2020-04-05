import { WhiteToothAPI } from './Api';
import { EnvironmentRepository } from '../../Core/Repositories/Adapters/EnvironmentFileSystemRepository';

const port = 3000;

// create repositries
const environmentRepository: EnvironmentRepository = new EnvironmentRepository();

const whitoothAPI = new WhiteToothAPI(port, environmentRepository);
whitoothAPI.start();
