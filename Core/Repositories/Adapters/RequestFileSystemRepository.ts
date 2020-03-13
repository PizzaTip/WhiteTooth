import fs = require('fs');
import Port = require('../Ports/IRequestRepository');
import { Request } from '../../Models/request';

class RequestRepository implements Port.IRequestRepository {
  /**
   * Adds request to data source
   * @param request rqeuest object to add
   */
  add(request: Request): void {
    const allRequests = this.getAllRequests();

    // validate request not exists already
    if (allRequests.find(req => req.relativePath === request.relativePath)) {
      throw 'Unable to add request - Request already exists';
    }

    allRequests.push(request);

    fs.writeFile(
      this._requestsConfigFilePath,
      JSON.stringify(allRequests),
      error => {
        if (error) {
          throw error;
        }
        console.log('New request added!');
      }
    );

    return;
  }

  /**
   * Deletes request from data source
   * @param requestPath the path of the request to be deleted
   */
  remove(requestPath: string): void {
    const allRequests = this.getAllRequests();

    // validate request exists already
    console.log(requestPath);
    if (!allRequests.find(req => req.relativePath == requestPath)) {
      throw 'Request not exists';
    }

    let filteredRequests = allRequests.filter(
      req => req.relativePath != requestPath
    );

    fs.writeFile(
      this._requestsConfigFilePath,
      JSON.stringify(filteredRequests),
      error => {
        if (error) {
          throw error;
        }
        console.log('Request deleted!');
      }
    );
  }

  get(requestPath: string): void {
    throw new Error('Method not implemented.');
  }

  private _requestsConfigFilePath: string =
    '../../Data/Requests/RequestsConfig.json';

  /**
   * Returns all requests types
   */
  public getAllRequests(): Request[] {
    console.log(`Getting requests...`);
    return JSON.parse(fs.readFileSync(this._requestsConfigFilePath, 'utf8'));
  }
}

export { RequestRepository };
