
module.exports = (errorType, t) => {
  const types = {
    E11000: { status: 409, error: t('E11000') },
    '403:password': { status: 403, error: t('403:password') },
    '403:noToken': { status: 403, error: t('403:noToken') },
    '403:noTokenVerified': { status: 403, error: t('403:noTokenVerified') },
    400: { status: 400, error: t('400') },
    '400:email': { status: 400, error: t('400:email') },
    404: { status: 404, error: t('404') },
    500: { status: 500, error: t('500') },
  };
  return types[errorType || '500'] || types['500'];
};
