export enum StatusCodes {
  NoContent = 204,
  Forbidden = 403,
  NotFound,
  UnprocessableEntity = 422,
}

export type Routes = 'track' | 'artist' | 'album';
