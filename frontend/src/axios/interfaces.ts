export interface IResponse<T> {
  ok: boolean;
  data?: T;
  error?: string;
}