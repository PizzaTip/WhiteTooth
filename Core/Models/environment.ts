import { Response } from './response';

export interface Environment {
  name: string;
  relativePath: string;
  responses: [Response];
}
