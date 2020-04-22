import { IWhiteToothAPI, WhiteToothAPI } from './Api';
import { RequestFileSystemRepository } from '../../Core/Repositories/Adapters/RequestFileSystemRepository';

describe('API TESTS', () => {

    let whitoothAPI: IWhiteToothAPI;
    beforeEach(() => {
        const port = 30000;
        const requestFileSystemRepository = new RequestFileSystemRepository();

        whitoothAPI = new WhiteToothAPI(
            port,
            requestFileSystemRepository
        );
    });

    it('API - parseRequestURL should throw an exception if URL has less than 1 slashe', () => {
        //Arrange
        const url = "example_environemnt";

        //Act + Assert
        expect(() => whitoothAPI.parseRequestURL(url)).toThrow()
    });
});