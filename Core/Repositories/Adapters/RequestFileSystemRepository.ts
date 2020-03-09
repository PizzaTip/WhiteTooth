import fs = require('fs');
import Port = require('../Ports/IRequestRepository');
import { Request } from '../../Models/request';

class RequestRepository implements Port.IRequestRepository {
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

  remove(requestPath: string): void {
    throw new Error('Method not implemented.');
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
