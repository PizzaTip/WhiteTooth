import Response from '../response/Response';

export default interface Request {
  id: string;
  name: string;
  url: string;
  method: string;
  response: Response;
}
