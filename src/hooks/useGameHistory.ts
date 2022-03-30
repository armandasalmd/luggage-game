import { useEffect, useState, useCallback } from "react";
import { IHistoryItem } from "@utils/game/IHistoryItem";
import RouteUtils from "@utils/Route";
import { message } from "@components/atoms";

export default function useGameHistory(itemsPerPage: number) {
  const [historyData, setHistoryData] = useState<IHistoryItem[]>([]);
  const [maxPage, setMaxPage] = useState(1);

  const loadPage = useCallback((pageNumber: number) => {
    const route = RouteUtils.routes.api.game.getHistory;

    RouteUtils.sendApiRequest(route, {
      pageSize: itemsPerPage,
      pageNumber: pageNumber
    })
    .then((res) => {
      if (Array.isArray(res.data.items)) {
        setHistoryData(res.data.items);
        setMaxPage(res.data.pagesCount);
      } else message.error("Unexpected error");
    })
    .catch(message.error);
  }, [itemsPerPage]);

  useEffect(() => {
    loadPage(1);

    return RouteUtils.axiosAbort;
  }, [loadPage]);

  return { historyData, jump: loadPage, maxPage };
}