class Request {
  public relativePath: string;
  public name: string;

  constructor(relativePath: string, name: string) {
    this.relativePath = relativePath;
    this.name = name;
  }
}

export { Request };
