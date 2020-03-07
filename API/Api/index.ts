import api = require('./Api');
import environmentRepositoryAdapter = require('../../Core/Repositories/Adapters/EnvironmentFileSystemRepository');

const port = 3000;

// create repositries
const environmentRepository: environmentRepositoryAdapter.EnvironmentRepository = new environmentRepositoryAdapter.EnvironmentRepository();

const whitoothAPI = new api.WhiteToothAPI(
    port,
    environmentRepository
);
whitoothAPI.start();
