import { useState } from "react";

import "./FriendsSearch.scss";
import {
  Button,
  Card,
  Friend,
  Input,
  Pagination,
  Empty,
} from "@components/atoms";
import { FriendAction } from "@components/atoms/Friend/Friend";
import useUserSearch from "@hooks/useUserSearch";
import { FriendState, IFriendUser } from "@utils/interfaces/IFriendUser";

const FriendsSearch = () => {
  const [term, setTerm] = useState("");
  const { currentData, error, search, invite, jump, maxPage } =
    useUserSearch(6);

  const inviteAction: FriendAction = {
    text: "Invite",
    type: "button",
    onClick: invite,
  };

  const invited: FriendAction = {
    text: "Invite sent",
    type: "label",
  };

  const friends: FriendAction = {
    text: "Already friends",
    type: "label",
  };

  function createFriendComponent(user: IFriendUser, index: number) {
    const action: FriendAction =
      user.state === FriendState.Friends
        ? friends
        : user.state === FriendState.Pending
        ? invited
        : inviteAction;
    return (
      <Friend
        key={index}
        name={user.username}
        avatar={user.avatar}
        actions={[action]}
      />
    );
  }

  const data: IFriendUser[] = currentData();
  const users = data?.map(createFriendComponent) ?? [];

  return (
    <Card noContentPaddingX className="friendsSearch" title="Search for people">
      <div className="friendsSearch__input">
        <Input
          error={error}
          value={term}
          setValue={setTerm}
          placeholder="Enter friend's username"
          onSubmit={() => search(term)}
        />
        <Button onClick={() => search(term)}>Search</Button>
      </div>
      <div className="friendsSearch__list">
        {users}
        {users.length === 0 && <Empty text="Enter name to search" />}
      </div>
      {users.length > 0 && (
        <div className="friendsSearch__pages">
          <Pagination onChange={jump} pageCount={maxPage} />
        </div>
      )}
    </Card>
  );
};

export default FriendsSearch;
