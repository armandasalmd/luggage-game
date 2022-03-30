import axios, { AxiosPromise } from "axios";
import Constants from "@utils/Constants";
import RouteVariables, { IRoute } from "@utils/RouteVariables";

let axiosAbortController = new AbortController();

function resolveHostName(): string {
  return Constants.env === "development" && Constants.preferDevApi
    ? Constants.servers.devApi
    : Constants.servers.prodApi;
}

function resolveUrl(path: IRoute | string): string {
  if (typeof path === "string") {
    return path.startsWith("http") ? path : resolveHostName() + path;
  } else {
    return resolveHostName() + path.path;
  }
}

function sendApiRequest(apiRoute: IRoute, bodyData?: any, queryParams?: any) {
  axiosAbortController = new AbortController();
  
  let url = resolveUrl(apiRoute.path) || "/";
  
  if (queryParams && typeof queryParams === "object") {
    let queryString = "?";

    for (let key in queryParams) {
      queryString += `${key}=${queryParams[key]}&`;
    }

    url += queryString.slice(0, -1);
  }

  return new Promise(function (resolve, reject) {
    axios({
      signal: axiosAbortController.signal,
      method: apiRoute.method || "GET",
      data: bodyData || {},
      url,
    })
    .then((res) => resolve(res))
    .catch((e) => {
      if (!axios.isCancel(e)) {
        reject(e);
      }
    });
  }) as AxiosPromise;
}

const items = {
  axiosAbort: () => axiosAbortController.abort(),
  sendApiRequest,
  resolveUrl,
  resolveHostName,
  routes: RouteVariables
};

export default items;
