import axios from "axios";
import Constants from "@utils/Constants";
import RouteVariables, { IRoute } from "@utils/RouteVariables";

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
  let url = resolveUrl(apiRoute.path) || "/";

  if (queryParams && typeof queryParams === "object") {
    let queryString = "?";

    for (let key in queryParams) {
      queryString += `${key}=${queryParams[key]}&`;
    }

    url += queryString.slice(0, -1);
  }

  return axios({
    method: apiRoute.method || "GET",
    data: bodyData || {},
    url,
  });
}

const items = {
  sendApiRequest,
  resolveUrl,
  resolveHostName,
  routes: RouteVariables
};

export default items;
