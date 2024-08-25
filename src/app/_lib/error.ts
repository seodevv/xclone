'use client';

export const ERROR_STATUS = {
  fetchError: 'fetch-error',
  badRequest: 'bad-request',
  unAuthorized: 'unAuthorized',
  forbidden: 'forbidden',
  notFound: 'not-found',
  pageNotFound: 'page-not-found',
  serverError: 'server-error',
};

export const responseErrorHandler = (res: Response) => {
  if (res.status === 400) {
    throw new Error(ERROR_STATUS.badRequest);
  } else if (res.status === 401) {
    throw new Error(ERROR_STATUS.forbidden);
  } else if (res.status === 403) {
    throw new Error(ERROR_STATUS.forbidden);
  } else if (res.status === 404) {
    throw new Error(ERROR_STATUS.notFound);
  } else if (res.status === 500) {
    throw new Error(ERROR_STATUS.serverError);
  } else {
    throw new Error(ERROR_STATUS.fetchError);
  }
};
