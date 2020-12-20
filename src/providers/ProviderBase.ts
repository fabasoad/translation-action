import fetch, { RequestInit, Response } from 'node-fetch';

export class ProviderError extends Error {
  private status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
  public getStatus(): number {
    return this.status;
  }
}

export default abstract class ProviderBase {
  // eslint-disable-next-line no-unused-vars
  abstract translate(text: string, lang: string): Promise<string[]>;
  protected async api<T>(url: string, init?: RequestInit): Promise<T> {
    const response: Response = await fetch(url, init);
    if (!response.ok) {
      throw new ProviderError(response.status, response.statusText);
    }
    return response.json();
  }
}
