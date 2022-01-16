import "./FriendsSearch.scss";
import { Button, Card, Friend, Input, Pagination } from "@components/atoms";
import { FriendAction } from "@components/atoms/Friend/Friend";

const FriendsSearch = () => {
  const inviteAction: FriendAction = {
    text: "Invite",
    type: "button",
    onClick: (name) => console.log("Invite:", name)
  };

  const invited: FriendAction = {
    text: "Invite sent",
    type: "label",
  };

  return (
    <Card noContentPaddingX className="friendsSearch" title="Search for people">
      <div className="friendsSearch__input">
        <Input placeholder="Enter friend's username" />
        <Button>Search</Button>
      </div>
      <div className="friendsSearch__list">
        <Friend name="testname" actions={[inviteAction]} />
        <Friend name="testname2" actions={[invited]} />
        <Friend name="testname3" actions={[inviteAction]} />
        <Friend name="testname4" actions={[inviteAction]} />
      </div>
      <div className="friendsSearch__pages">
        <Pagination pageCount={3} />
      </div>
    </Card>
  );
};

export default FriendsSearch;
