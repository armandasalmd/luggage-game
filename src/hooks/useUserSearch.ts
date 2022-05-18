import { useState } from "react";
import usePagination from "./usePagination";
import RouteUtils from "@utils/Route";
import { FriendState, IFriendUser } from "@utils/interfaces/IFriendUser";

export default function useUserSearch(itemsPerPage: number) {
  const [error, setError] = useState("");
  const { currentPage, currentData, setData, jump, maxPage } = usePagination(
    [],
    itemsPerPage
  );

  function search(term: string) {
    const route = RouteUtils.routes.api.friends.search;

    RouteUtils.sendApiRequest(route, {
      pageSize: itemsPerPage,
      pageNumber: currentPage,
      searchTerm: term,
    })
      .then((res) => {
        if (res.data.errorMessage) {
          setError(res.data.errorMessage);
        } else {
          setData(res.data.users);
          setError("");
        }
      })
      .catch(() => {
        setError("Wrong input");
      });
  }

  function invite(username: string) {
    const route = RouteUtils.routes.api.friends.add;

    RouteUtils.sendApiRequest(route, {
      friendUsername: username,
    })
      .then((res) => {
        if (res.data?.errorMessage) {
          setError(res.data.errorMessage);
        } else {
          const items = currentData();
          const user: any = items.find((item: IFriendUser) => item.username === username);
          user.state = FriendState.Pending;
          setData([...items]);
        }
      })
      .catch(() => {
        setError("Unexpected error");
      });
  }

  return { currentData, error, search, invite, jump, maxPage };
}
