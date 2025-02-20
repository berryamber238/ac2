const isHttpLink = url => {
  const regex = /^(http:\/\/|https:\/\/)[^\s$.?#].[^\s]*$/;
  return regex.test(url);
};

export default isHttpLink;
