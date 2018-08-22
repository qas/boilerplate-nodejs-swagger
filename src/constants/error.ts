/**
 * Client Failures
 */
const UNKNOWN_ENDPOINT = {
  code: 'UNKNOWN_ENDPOINT',
  message: 'The requested endpoint does not exist.',
};

const INVALID_REQUEST = {
  code: 'INVALID_REQUEST',
  message: 'The request has invalid parameters.',
};

/**
 * Server Errors
 */
const INTERNAL_ERROR = {
  code: 'INTERNAL_ERROR',
  message: 'The server encountered an internal error.',
};

const UNKNOWN_ERROR = {
  code: 'UNKNOWN_ERROR',
  message: 'The server encountered an unknown error.',
};

export {
  UNKNOWN_ENDPOINT,
  INVALID_REQUEST,
  INTERNAL_ERROR,
  UNKNOWN_ERROR,
};
