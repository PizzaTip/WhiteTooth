interface Request {
    id: string;
    name: string;
    url: string;
    method: string;
    response: Response
}

interface Response {
    headers: { [key: string]: number | string }
    status: number,
    body: string
}

export { Request };
