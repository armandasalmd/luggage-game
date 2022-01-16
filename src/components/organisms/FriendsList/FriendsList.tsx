import { Card, Friend } from "@components/atoms";
import { FriendAction } from "@components/atoms/Friend/Friend";

const FriendsList = () => {
  const remove: FriendAction = {
    text: "Remove",
    type: "button",
    color: "secondary",
    onClick: (name) => console.log("Remove:", name),
  };

  return (
    <Card collapsable noHeaderLine noContentPaddingY noContentPaddingX title="Your friends">
      <Friend name="Colyp2" actions={[remove]} />
      <Friend name="Tonny" actions={[remove]} />
    </Card>
  );
};

export default FriendsList;
