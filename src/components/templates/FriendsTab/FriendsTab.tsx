import "./FriendsTab.scss";
import {
  FriendInvites,
  FriendsList,
  FriendsSearch,
} from "@components/organisms";
import useFriendsData from "@hooks/useFriendsData";

const FriendsTab = () => {
  const { friends, invites, loading, respondInvite, remove } = useFriendsData();

  return <div className="friends">
    <div className="friends__cardsLeft">
      <FriendsSearch />
    </div>
    <div className="friends__cardsRight">
      <FriendInvites loading={loading} invites={invites} respondInvite={respondInvite} />
      <FriendsList loading={loading} friends={friends} remove={remove} />
    </div>
  </div>;
};

export default FriendsTab;
