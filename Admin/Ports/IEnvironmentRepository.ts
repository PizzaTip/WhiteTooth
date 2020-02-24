interface IEnvironmentRepository {
  getEnvironmentByName(environmentName: string): any;
  getAllEnvironments(): string[];
}

export { IEnvironmentRepository };
