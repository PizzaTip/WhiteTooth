class Request {
  public id: string;
  public name: string;
  public relativePath: string;

  constructor(id: string, relativePath: string, name: string) {
    this.id = id;
    this.name = name;
    this.relativePath = relativePath;
  }
}

export { Request };
