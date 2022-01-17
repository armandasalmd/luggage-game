import "./FriendsTab.scss";
import {
  FriendInvites,
  FriendsList,
  FriendsSearch,
} from "@components/organisms";
import useFriendsData from "@hooks/useFriendsData";

const FriendsTab = () => {
  const { friends, invites, respondInvite, remove } = useFriendsData();

  return <div className="friends">
    <div className="friends__cardsLeft">
      <FriendsSearch />
    </div>
    <div className="friends__cardsRight">
      <FriendInvites invites={invites} respondInvite={respondInvite} />
      <FriendsList friends={friends} remove={remove} />
    </div>
  </div>;
};

export default FriendsTab;
