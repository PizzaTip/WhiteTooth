import api = require('./Api');
import requestRepositoryAdapter = require('../Core/Repositories/Adapters/FileSystem/RequestRepository');
import environmentRepositoryAdapter = require('../Core/Repositories/Adapters/FileSystem/EnvironmentRepository');

const port = 3100;

// create repositries
const requestRepository: requestRepositoryAdapter.RequestRepository = new requestRepositoryAdapter.RequestRepository();
const environmentRepository: environmentRepositoryAdapter.EnvironmentRepository = new environmentRepositoryAdapter.EnvironmentRepository();

const adminApi = new api.AdminApi(
  port,
  requestRepository,
  environmentRepository
);
adminApi.start();
