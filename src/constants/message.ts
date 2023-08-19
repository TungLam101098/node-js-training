export default {
  ERROR: {
    PATH_NOT_FOUND: {
      CODE: 404,
      MESSAGE: 'The request not found',
    },
    INTERNAL_SERVER: {
      CODE: 500,
      MESSAGE: 'Something went wrong',
    },
    USER_EXIST: {
      CODE: 409,
      MESSAGE: 'Username is existed',
    }
  },
};
