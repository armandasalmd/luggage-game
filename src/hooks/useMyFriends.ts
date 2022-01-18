import { useState, useEffect } from "react";
import { IFriendUser } from "@utils/game/IFriendUser";
import RouteUtils from "@utils/Route";

export interface IMyFriend extends IFriendUser {
  invited: boolean;
}

export default function useMyFriends() {
  const [friends, setFriends] = useState<IMyFriend[]>([]);
  const [error, setError] = useState("");

  function sendInvite(username: string) {
    const route = RouteUtils.routes.api.lobby.inviteFriend;

    RouteUtils.sendApiRequest(route, { username })
      .then((res) => {
        if (res.data.success) {
          const friend = friends.find((item) => item.username === username);

          if (!friend) {
            setError("User not found");
          } else {
            friend.invited = true;
            setFriends([...friends]);
            setError("");
          }
        }
      })
      .catch(() => {
        setError("Unexpected error");
      });
  }

  useEffect(() => {
    const route = RouteUtils.routes.api.friends.friendsAndInvites;

    RouteUtils.sendApiRequest(route)
      .then((res) => {
        if (res.data.errorMessage) {
          setError(res.data.errorMessage);
        } else {
          setFriends(
            res.data.friends.map((item: IFriendUser) => ({
              ...item,
              invited: false,
            }))
          );
          setError("");
        }
      })
      .catch(() => {
        setError("Unexpected error");
      });
  }, []);

  return { friends, error, sendInvite };
}
