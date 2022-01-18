export type NotificationType = "friendInvite" | "lobbyInvite";

export interface LobbyMetaData {
  price: number;
  players: number;
  playersMax: number;
}

export interface INotification {
  date: Date;
  description: string;
  image?: string;
  metaData?: LobbyMetaData;
  title: string;
  type: NotificationType;
}
