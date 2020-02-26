interface IEnvironmentRepository {
  getEnvironmentByName(environmentName: string): any;
  getAllEnvironments(): Promise<string[]>;
}

export { IEnvironmentRepository };
