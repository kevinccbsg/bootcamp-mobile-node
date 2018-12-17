
module.exports = (errorType) => {
  const types = {
    'Error: E11000': { status: 409, error: 'User already exists' },
    '403:password': { status: 403, error: 'Wrong password' },
    '403:noToken': { status: 403, error: 'No token Provided' },
    '403:noTokenVerified': { status: 403, error: 'No token Verified' },
    400: { status: 400, error: 'Bad Request' },
    404: { status: 404, error: 'Not Found' },
    500: { status: 500, error: 'Internal server Error' },
  };
  return types[errorType || '500'] || types['500'];
};
