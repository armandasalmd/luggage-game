import { Card, Friend } from "@components/atoms";
import { FriendAction } from "@components/atoms/Friend/Friend";

const FriendInvites = () => {
  const accept: FriendAction = {
    text: "Accept",
    type: "button",
    onClick: (name) => console.log("Accept:", name),
  };

  const reject: FriendAction = {
    text: "Reject",
    type: "button",
    color: "secondary",
    onClick: (name) => console.log("Reject:", name),
  };

  return (
    <Card collapsable title="Friend invites" noHeaderLine noContentPaddingX noContentPaddingY>
      <Friend name="Codymol2" actions={[accept, reject]} />
      <Friend name="Tomukas" actions={[accept, reject]} />
      <Friend name="nginx" actions={[accept, reject]} />
    </Card>
  );
};

export default FriendInvites;
