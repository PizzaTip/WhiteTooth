interface Request {
    id: string;
    name: string;
    url: string;
    method: string;
    response: Response;
}

interface Response {
    headers: { [key: string]: number | string }
    status: number,
    body: string
}

class WTRequestFactory {
    static Create = (id: string, name: string, url: string, method: string, response: Response): Request => ({
        id,
        name,
        url,
        method,
        response
    });
}

export { Request, WTRequestFactory };
