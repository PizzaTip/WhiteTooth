class Request {
  public relativePath: string;
  public name: string;
  public id: string;

  constructor(id: string, relativePath: string, name: string) {
    this.relativePath = relativePath;
    this.name = name;
    this.id = id;
  }
}

export { Request };
