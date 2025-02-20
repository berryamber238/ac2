import * as HttpClient from '../custom-files/HttpClient';

const HttpRequest = async (endpoint, data) => {
  // const url = `https://app.interimapi.com/api/v1/d0b3f586-9f22-4377-88b6-502117a85bf2/popular_events`;

  // const response = await HttpClient.fetcher(url,"get",null);

  const url = HttpClient.apiEndpoints[endpoint];
  const response = await HttpClient.fetcher(url.url, url.method, data);
  return response;
};

export default HttpRequest;
