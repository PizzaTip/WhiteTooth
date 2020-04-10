import { Response } from './response';

export interface Environment {
    name: string;
    relativePath: string;
    responses: Response[];
}

export class EnvironmentResponseExtractor {
    private response: Response | null;

    constructor(responses: Response[], method: string, url:string) {
        let potenialResponse = responses.filter(res => res.method === method && res.relativepath === url);
        this.response = null;
        if (potenialResponse.length > 0) {
            this.response = potenialResponse[0];
        }
    }

    get(): Response | null {
        return this.response;
    }
}
