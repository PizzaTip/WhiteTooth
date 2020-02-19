interface IDal {
  getEnvironmentByName(environmentName: string): any;
  getAllEnvironments(): string[];
  getAllRequests(): string[];
}

export { IDal };
