import fs = require('fs');
import Port = require('../Ports/IRequestRepository');
import { Request } from '../../Models/request';

class RequestRepository implements Port.IRequestRepository {
  private _requestsConfigFilePath: string =
    '../Data/Requests/RequestsConfig.json';

  /**
   * Returns all requests types
   */
  public getAllRequests(): Request[] {
    console.log(`Getting requests...`);
    return JSON.parse(fs.readFileSync(this._requestsConfigFilePath, 'utf8'));
  }
}

export { RequestRepository };
