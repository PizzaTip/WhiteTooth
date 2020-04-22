import { WhiteToothAPI } from './Api';
import { IRequestRepository } from '../../Core/Repositories/Ports/IRequestRepository';
import { RequestFileSystemRepository } from '../../Core/Repositories/Adapters/RequestFileSystemRepository';

const port = 3000;

// create repositries
const requestRepository: IRequestRepository = new RequestFileSystemRepository();

const whitoothAPI = new WhiteToothAPI(port, requestRepository);
whitoothAPI.start();
