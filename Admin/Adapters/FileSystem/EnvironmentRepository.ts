import fs = require('fs');
import Port = require('../../Ports/IEnvironmentRepository');
import path = require('path');

class EnvironmentRepository implements Port.IEnvironmentRepository {
  private _environmentsDirectoryPath: string = '../Data/Environments';

  /**
   * Find all files inside a dir, recursively.
   * @function getAllFilesInDirectoryRecursive
   * @param  {string} dir Dir path string.
   * @return {string[]} Array with all file names that are inside the directory.
   */
  public getAllFilesInDirectoryRecursive = (dir: string): string[] =>
    fs.readdirSync(dir).reduce((files: string[], file: string): string[] => {
      const name = path.join(dir, file);
      const isDirectory = fs.statSync(name).isDirectory();
      return isDirectory
        ? [...files, ...this.getAllFilesInDirectoryRecursive(name)]
        : [...files, name];
    }, []);

  /**
   * Returns environment data by environment name
   * @param environmentName the name of the environment
   */
  public getEnvironmentByName(environmentName: string): any {
    const path = `${this._environmentsDirectoryPath}/${environmentName}Environment.json`;
    console.log(`Getting ${environmentName} environment...`);
    if (fs.existsSync(path)) {
      return fs.readFileSync(path, 'utf8');
    } else {
      return null;
    }
  }

  /**
   * Return all environments data
   */
  public getAllEnvironments(): string[] {
    console.log('Getting all envs...');
    let result: string[] = [];
    let environmentFiles = this.getAllFilesInDirectoryRecursive(
      this._environmentsDirectoryPath
    );
    environmentFiles.forEach(filePath => {
      result.push(JSON.parse(fs.readFileSync(filePath, 'utf8')));
    });
    return result;
  }
}

export { EnvironmentRepository };
