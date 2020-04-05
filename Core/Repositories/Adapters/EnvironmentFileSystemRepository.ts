import fs = require('fs');
import path = require('path');
import { IEnvironmentRepository } from '../Ports/IEnvironmentRepository';

class EnvironmentRepository implements IEnvironmentRepository {
  private _environmentsDirectoryPath: string = '../../Data/Environments';

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
      return JSON.parse(fs.readFileSync(path, 'utf8'));
    } else {
      return null;
    }
  }

  /**
   * Return all environments data
   */
  public async getAllEnvironments(): Promise<string[]> {
    console.log('Getting all envs...');
    let result: string[] = [];
    let environmentFiles = this.getAllFilesInDirectoryRecursive(
      this._environmentsDirectoryPath
    );
    await Promise.all(
      environmentFiles.map((filePath: string) => {
        return new Promise((resolve, reject) => {
          fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) throw err;
            resolve(JSON.parse(data));
          });
        });
      })
    ).then(results => {
      result = results.map(value => {
        return value as string;
      });
    });

    return result;
  }
}

export { EnvironmentRepository };
