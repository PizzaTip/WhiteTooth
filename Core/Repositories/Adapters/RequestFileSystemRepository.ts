import fs = require('fs');
import Port = require('../Ports/IRequestRepository');
import { Request } from '../../Models/request';

class RequestRepository implements Port.IRequestRepository {
  private readonly _requestsConfigFilePath: string =
    '../../Data/Requests/RequestsConfig.json';

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
   * Deletes request from data source by id
   * @param id id of the request to be deleted
   */
  remove(id: string): void {
    const allRequests = this.getAllRequests();

    // validate request exists already
    if (!allRequests.find(req => req.id == id)) {
      throw 'Request not exists';
    }

    let filteredRequests = allRequests.filter(req => req.id != id);

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

  update(request: Request): void {
    const allRequests = this.getAllRequests();
    const requestIndex = allRequests.findIndex(req => req.id === request.id);
    if (requestIndex < 0) {
      throw 'Request not found!';
    }

    allRequests[requestIndex].relativePath = request.relativePath;
    allRequests[requestIndex].name = request.name;

    fs.writeFile(
      this._requestsConfigFilePath,
      JSON.stringify(allRequests),
      error => {
        if (error) {
          throw error;
        }
        console.log('Request updated!');
      }
    );
  }

  get(id: string): Request | undefined {
    const allRequests = this.getAllRequests();

    const request = allRequests.find(req => req.id === id);
    if (!request) {
      throw 'Request did not found';
    }

    return request;
  }

  /**
   * Returns all requests types
   */
  public getAllRequests(): Request[] {
    console.log(`Getting requests...`);
    let buffer = fs.readFileSync(this._requestsConfigFilePath, 'utf8');
    if (buffer.length === 0) {
      return JSON.parse('[]');
    }
    return JSON.parse(fs.readFileSync(this._requestsConfigFilePath, 'utf8'));
  }
}

export { RequestRepository };
