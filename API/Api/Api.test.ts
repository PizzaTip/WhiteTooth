import { IWhiteToothAPI, WhiteToothAPI, ParsedRequest} from './Api';
import environmentRepositoryAdapter = require('../../Core/Repositories/Adapters/EnvironmentFileSystemRepository');

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

    it('API - parseRequestURL url with two slashes should parse to environment name and url with one slash', () => {
        //Arrange
        const expectedEnvironemnt = "example_environemnt";
        const expectedURL = "/test_url";

        const expectedResult: ParsedRequest = {
            environmentName: expectedEnvironemnt,
            url: expectedURL
        };

        const urlToParse = `/${expectedEnvironemnt}${expectedURL}`;

        //Act
        const parsedURL = whitoothAPI.parseRequestURL(urlToParse);

        //Assert
        expect(parsedURL).toEqual(expectedResult);
    });

    test.each([
        ["example_environemnt", "/test_url", 1],
        ["example_environemnt", "/test_url/1", 2],
        ["example_environemnt", "/test_url/1/2", 3],
        ["example_environemnt", "/test_url/1/2/3", 4],
    ])('API - parseRequestURL given URL: `/%s%s` result url should contain:%i salshes ', (environmentName, url, expectedSlashesInURL) => {
        //Arrange
        const expectedResult: ParsedRequest = {
            environmentName: environmentName,
            url: url
        };

        const urlToParse = `/${environmentName}${url}`;

        //Act
        const parsedURL = whitoothAPI.parseRequestURL(urlToParse);

        //Assert
        expect(parsedURL).toEqual(expectedResult);
        expect(parsedURL.url.split("/").length - 1).toBe(expectedSlashesInURL);
    });
});