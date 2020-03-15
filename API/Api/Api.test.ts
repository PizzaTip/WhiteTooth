import { IWhiteToothAPI, WhiteToothAPI} from './Api';
import environmentRepositoryAdapter = require('../../Core/Repositories/Adapters/EnvironmentFileSystemRepository');

jest.mock('../../Core/Repositories/Ports/IEnvironmentRepository');

describe('API TESTS', () => {

  
    let whitoothAPI: IWhiteToothAPI;
    beforeEach(() => {
        const port = 30000;
        const environmentRepository = new environmentRepositoryAdapter.EnvironmentRepository();

        whitoothAPI = new WhiteToothAPI(
            port,
            environmentRepository
        );
    });

    it('API - parseRequestURL should throw an exception if URL has less than 2 slashes', () => {
        //Arrange
        const url = "/example_environemnt";

        //Act + Assert
        expect(() => whitoothAPI.parseRequestURL(url)).toThrow()
    });
});