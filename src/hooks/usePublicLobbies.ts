import { useEffect, useState } from "react";

import { IPublicGame } from "@components/atoms/GameListItem/GameListItem";
import SocketManager from "@socket/SocketManager";
import {
  subscribeToPublicLobbiesAsync,
  publicLobbiesChangedListener,
} from "@socket/lobby";
import { ID } from "@utils/Types";

export default function usePublicLobbies(rulesFilter: ID, priceFilter: ID) {
  const [lobbies, setLobbies] = useState<IPublicGame[]>([]);
  const [filtered, setFiltered] = useState<IPublicGame[]>([]);

  useEffect(() => {
    subscribeToPublicLobbiesAsync(true)
      .then((lobbyItems) => setLobbies(lobbyItems))
      .catch(() => console.warn("Cannot fetch public lobbies"));

    publicLobbiesChangedListener((lobbyItems) => {
      setLobbies(lobbyItems);
    });
    
    return () => {
      subscribeToPublicLobbiesAsync(false);
      SocketManager.getInstance().removeListener("lobby public subscribe");
    };
  }, []);

  useEffect(() => {
    setFiltered(lobbies.filter((item) => {
      const rulesMatch = !rulesFilter || item.modeTitle === rulesFilter;
      const priceMatch = !priceFilter || priceFilter === "-1" || item.price.toString() === priceFilter;

      return rulesMatch && priceMatch;
    }));
  }, [lobbies, setLobbies, priceFilter, rulesFilter]);

  return [filtered];
}
