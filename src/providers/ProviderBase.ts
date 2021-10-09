import {IRestResponse, RestClient} from 'typed-rest-client/RestClient';
import { IHeaders } from 'typed-rest-client/Interfaces';

export class ProviderError extends Error {
  private readonly status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
  public getStatus(): number {
    return this.status;
  }
}

export interface ApiProps {
  data?: object;
  headers?: IHeaders;
  method: string;
  url: string;
}

export default abstract class ProviderBase {
  private readonly baseUrl?: string;
  private readonly client: RestClient;

  protected constructor(baseUrl?: string) {
    this.baseUrl = baseUrl;
    this.client = new RestClient(null, baseUrl);
  }

  // eslint-disable-next-line no-unused-vars
  abstract translate(text: string, lang: string): Promise<string[]>;
  protected async api<T>(props: ApiProps): Promise<T> {
    let response: IRestResponse<T>;
    if (props.method.toUpperCase() === 'GET') {
      response = await this.client.get<T>(
        props.url, { additionalHeaders: props.headers });
    } else {
      response = await this.client.create<T>(
        props.url, props.data, { additionalHeaders: props.headers });
    }
    if (response.statusCode < 200 || response.statusCode >= 400) {
      throw new ProviderError(
        response.statusCode,
        `[${response.statusCode}] Failed to call ${this.baseUrl}${props.url}`);
    }
    return response.result as T;
  }
}
