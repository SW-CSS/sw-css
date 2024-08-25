/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
import { AxiosError } from 'axios';

export class ApplicationError extends Error {
  originalError?: AxiosError<any>;

  constructor(error?: AxiosError, message?: string) {
    super();
    this.originalError = error;
    this.name = 'ApplicationError';
    this.message = message ? message : 'ApplicationError';
  }
}

export class BusinessError extends Error {
  originalError?: AxiosError<any>;

  constructor(error?: AxiosError, message?: string) {
    super();
    this.originalError = error;
    this.name = 'BusinessError';
    this.message = message ? message : 'MemberRoleNotMatchedError';
  }
}

export class AuthError extends BusinessError {
  constructor(error?: AxiosError, message?: string) {
    super(error, message);
    this.name = 'AuthError';
    this.message = message ? message : 'MemberRoleNotMatchedError';
  }
}

export class NotFoundError extends AuthError {
  constructor(error?: AxiosError, message?: string) {
    super(error, message);
    this.name = 'NotFoundError';
    this.message = message ? message : 'MemberRoleNotMatchedError';
  }
}

export class AccessDeniedError extends AuthError {
  constructor(error?: AxiosError, message?: string) {
    super(error, message);
    this.name = 'AccessDeniedError';
    this.message = message ? message : 'MemberRoleNotMatchedError';
  }
}

export class UnauthorizedError extends AuthError {
  constructor(error?: AxiosError, message?: string) {
    super(error, message);
    this.name = 'UnauthorizedError';
    this.message = message ? message : 'MemberRoleNotMatchedError';
  }
}

export class MemberRoleNotMatchedError extends AuthError {
  constructor(error?: AxiosError, message?: string) {
    super(error, message);
    this.name = 'MemberRoleNotMatchedError';
    this.message = message ? message : 'MemberRoleNotMatchedError';
  }
}

export class MemberNotFoundError extends AuthError {
  constructor(error?: AxiosError, message?: string) {
    super(error, message);
    this.name = 'MemberNotFoundError';
    this.message = message ? message : 'MemberNotFoundError';
  }
}

export const categorizeError = (error: Error) => {
  if (error instanceof AxiosError && error.response) {
    if (error.response.status === 401) {
      return new UnauthorizedError(error, error.response.data.message);
    }

    if (error.response.status === 403) {
      return new AccessDeniedError(error, error.response.data.message);
    }

    if (error.response.status === 404) {
      if (error.response.data.title === 'MEMBER_NOT_FOUND') {
        return new MemberNotFoundError(error, error.response.data.message);
      }
      return new NotFoundError(error, error.response.data.message);
    }

    if (error.response.status === 409 && error.response.data.title === 'MEMBER_ROLE_NOT_MATCHED') {
      return new MemberRoleNotMatchedError(error, error.response.data.message);
    }

    if (error.response.status >= 400 && error.response.status < 500) {
      return new BusinessError(error, error.response.data.message);
    }

    if (error.response.status >= 500) {
      return new ApplicationError(error, error.response.data.message);
    }
  }
  return error;
};

export const deserializeError = (error: Error) => {
  switch (error.message) {
    case 'UnauthorizedError':
      return new UnauthorizedError();
    case 'AccessDeniedError':
      return new AccessDeniedError();
    case 'MemberNotFoundError':
      return new MemberNotFoundError();
    case 'NotFoundError':
      return new NotFoundError();
    case 'MemberRoleNotMatchedError':
      return new MemberRoleNotMatchedError();
    case 'BusinessError':
      return new BusinessError();
    case 'ApplicationError':
      return new ApplicationError();
    default:
      return error;
  }
};
