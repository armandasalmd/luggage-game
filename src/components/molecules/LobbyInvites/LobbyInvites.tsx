import { FC } from "react";
import classNames from "classnames";

import { Card, Empty, Friend } from "@components/atoms";
import useMyFriends, { IMyFriend } from "@hooks/useMyFriends";
import { FriendAction } from "@components/atoms/Friend/Friend";

interface LobbyInvitesProps {
  className?: string;
}

const LobbyInvites: FC<LobbyInvitesProps> = (props) => {
  const classes = classNames(props.className);
  const { friends, error, sendInvite } = useMyFriends();

  const invitedLabel: FriendAction = {
    type: "label",
    text: "Invited"
  };

  const inviteButton: FriendAction = {
    type: "button",
    text: "Invite",
    onClick: sendInvite,
  };

  function toFriendComponent(friend: IMyFriend, idx: number) {
    return (
      <Friend
        key={idx}
        avatar={friend.avatar}
        name={friend.username}
        actions={[friend.invited ? invitedLabel : inviteButton]}
      />
    );
  }

  return (
    <Card
      title="Invite your friends"
      noContentPaddingX
      noContentPaddingY
      noHeaderLine={friends?.length !== 0}
      error={error}
      collapsable
      className={classes}
    >
      {friends?.map(toFriendComponent)}
      {friends?.length === 0 && <Empty text="No available friends found" />}
    </Card>
  );
};

export default LobbyInvites;
