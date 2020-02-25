import fs = require('fs');
import Port = require('../Ports/IRequestRepository');

class RequestRepository implements Port.IRequestRepository {
  private _requestsConfigFilePath: string =
    '../Data/Requests/RequestsConfig.json';

  /**
   * Returns all requests types
   */
  public getAllRequests(): string[] {
    console.log(`Getting requests...`);
    return JSON.parse(fs.readFileSync(this._requestsConfigFilePath, 'utf8'));
  }
}

export { RequestRepository };
