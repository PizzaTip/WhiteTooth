import fs = require('fs');
import path = require('path');

class FileSystemDal {
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
   * Returns all requests types
   */
  public getAllRequests() {
    console.log(`Getting requests...`);
    return fs.readFileSync('../Data/Requests/RequestsConfig.json', 'utf8');
  }

  /**
   * Returns environment data by environment name
   * @param environmentName the name of the environment
   */
  public getEnvironmentByName(environmentName: string) {
    const path = `../Data/Environments/${environmentName}Environment.json`;
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
  public getAllEnvironments() {
    console.log('Getting all envs...');
    let result: any[] = [];
    let files = this.getAllFilesInDirectoryRecursive('../Data/Environments');
    console.log(`number of files ${files.length}`);
    files.forEach(filePath => {
      result.push(JSON.parse(fs.readFileSync(filePath, 'utf8')));
    });
    return result;
  }
}

export { FileSystemDal };
