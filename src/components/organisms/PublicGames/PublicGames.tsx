import { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./PublicGames.scss";
import { Card, Select, Pagination, message } from "@components/atoms";
import { GameList } from "@components/molecules";
import {
  gameRulesDropdown,
  priceDropdown,
} from "@components/templates/PlayGameTab/dropdownValues";
import usePublicLobbies from "@hooks/usePublicLobbies";
import usePagination from "@hooks/usePagination";
import { joinLobbyAsync } from "@socket/lobby";
import { setLobbyState } from "@redux/actions";
import { ID } from "@utils/Types";

interface PublicGamesProps {}

const PublicGames: FC<PublicGamesProps> = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  
  const [rules, setRules] = useState<ID>("classic"); 
  const [price, setPrice] = useState<ID>("0");
  const [lobbies] = usePublicLobbies(rules, price);

  const { jump, currentData, maxPage, setData } = usePagination(lobbies, 10);

  function joinLobby(roomId: string) {
    if (roomId) {
      joinLobbyAsync(roomId.toLowerCase())
        .then((data) => {
          if (data.success) {
            dispatch(setLobbyState(data.lobbyState));
            history.push("/lobby/" + data.lobbyState.roomCode);
          } else {
            message.error(data.errorMessage.message);
          }
        })
        .catch(() => message.error("Unexpected error"));
    }
  }

  useEffect(() => {
    setData(lobbies);
  // eslint-disable-next-line
  }, [lobbies]);

  return (
    <Card className="publicGames" title="Public games">
      <div className="publicGames__filter">
        <Select
          title="Game price"
          idKey="key"
          textKey="value"
          items={priceDropdown}
          defaultSelectedId={price}
          onChange={setPrice}
          
        />
        <Select
          title="Game mode"
          idKey="key"
          textKey="value"
          items={gameRulesDropdown}
          defaultSelectedId={rules}
          onChange={setRules}
        />
      </div>
      <div className="publicGames__list">
        <GameList items={currentData()} onItemClick={joinLobby} />
      </div>
      {lobbies.length > 0 && (
        <div className="publicGames__alignRight">
          <Pagination pageCount={maxPage} onChange={jump} />
        </div>
      )}
    </Card>
  );
};

export default PublicGames;
