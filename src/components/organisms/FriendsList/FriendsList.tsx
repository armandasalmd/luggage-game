import { FC } from "react";

import { Card, Friend, Empty, Loader } from "@components/atoms";
import { FriendAction } from "@components/atoms/Friend/Friend";
import { IFriendUser } from "@utils/game/IFriendUser";

interface FriendsListProps {
  friends: IFriendUser[];
  remove(username: string): void;
  loading: boolean;
}

const FriendsList: FC<FriendsListProps> = (props) => {
  const remove: FriendAction = {
    text: "Remove",
    type: "button",
    color: "secondary",
    onClick: props.remove,
  };

  function toFriendComponent(user: IFriendUser) {
    return <Friend name={user.username} avatar={user.avatar} actions={[remove]} />
  }

  const friends = props.friends?.map(toFriendComponent) ?? [];

  return (
    <Card collapsable noHeaderLine noContentPaddingY noContentPaddingX title="Your friends">
      {friends}
      {!props.loading && friends.length === 0 && <Empty text="Friends list empty" />}
      {props.loading && <Loader marginY />}
    </Card>
  );
};

export default FriendsList;
