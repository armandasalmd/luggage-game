import "./FriendsTab.scss";
import {
  FriendInvites,
  FriendsList,
  FriendsSearch,
} from "@components/organisms";

const FriendsTab = () => {
  return <div className="friends">
    <div className="friends__cardsLeft">
      <FriendsSearch />
    </div>
    <div className="friends__cardsRight">
      <FriendInvites />
      <FriendsList />
    </div>
  </div>;
};

export default FriendsTab;
