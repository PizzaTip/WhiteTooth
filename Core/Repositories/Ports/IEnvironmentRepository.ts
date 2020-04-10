import { Environment } from "../../Models/environment";

interface IEnvironmentRepository {
  getEnvironmentByName(environmentName: string): any;
    getAllEnvironments(): Promise<Environment[]>;
}

export { IEnvironmentRepository };
