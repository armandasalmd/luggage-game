import { useState, useEffect } from "react";
import RouteUtils from "@utils/Route";
import { FriendState, IFriendUser } from "@utils/game/IFriendUser";
import { message } from "@components/atoms";

export default function useFriendsData() {
  const [friends, setFriends] = useState<IFriendUser[]>([]);
  const [invites, setInvites] = useState<IFriendUser[]>([]);

  function remove(username: string) {
    const route = RouteUtils.routes.api.friends.remove;

    RouteUtils.sendApiRequest(route, {
      username
    }).then((res) => {
      if (res.data && res.data.errorMessage) {
        message.error(res.data.errorMessage);
      } else {
        setFriends(friends.filter(item => item.username !== username));
      }
    })
  }
  
  function respondInvite(username: string, accept: boolean) {
    const route = RouteUtils.routes.api.friends.respondInvite;

    RouteUtils.sendApiRequest(route, {
      accept,
      username
    }).then((res) => {
      if (res.status === 200) {
        const user = invites.find(item => item.username === username);

        if (user) {
          if (accept === true) {
            user.state = FriendState.Friends;
            setFriends([user, ...friends]);
          }

          setInvites(invites.filter(item => item.username !== username));
        }
      } else {
        message.error("Unexpected error");
      }
    });
  }

  useEffect(() => {
    const route = RouteUtils.routes.api.friends.friendsAndInvites;

    RouteUtils.sendApiRequest(route).then((res) => {
      if (res.status === 200) {
        setFriends(res.data.friends || []);
        setInvites(res.data.invites || []);
      }
    })
  }, []);

  return { friends, invites, respondInvite, remove };
}