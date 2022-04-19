export enum FriendState {
  None = "none",
  Pending = "pending",
  Friends = "friends",
}

export interface IFriendUser {
  avatar?: string;
  username: string;
  state: FriendState;
}