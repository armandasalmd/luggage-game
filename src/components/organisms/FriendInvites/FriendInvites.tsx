import { FC } from "react";
import { Card, Friend, Empty } from "@components/atoms";
import { FriendAction } from "@components/atoms/Friend/Friend";
import { IFriendUser } from "@utils/game/IFriendUser";

interface FriendInvitesProps {
  invites: IFriendUser[];
  respondInvite(username: string, accept: boolean): void;
}

const FriendInvites: FC<FriendInvitesProps> = (props) => {
  const accept: FriendAction = {
    text: "Accept",
    type: "button",
    onClick: (name) => props.respondInvite(name, true),
  };

  const reject: FriendAction = {
    text: "Reject",
    type: "button",
    color: "secondary",
    onClick: (name) => props.respondInvite(name, false),
  };

  const actions = [accept, reject];

  function toFriendComponent(user: IFriendUser) {
    return <Friend name={user.username} avatar={user.avatar} actions={actions} />
  }

  const invites = props.invites?.map(toFriendComponent) ?? [];

  return (
    <Card collapsable title="Friend invites" noHeaderLine noContentPaddingX noContentPaddingY>
      {invites}
      {invites.length === 0 && <Empty text="No pending invites" /> }
    </Card>
  );
};

export default FriendInvites;
