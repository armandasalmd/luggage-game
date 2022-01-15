export interface IGameHistoryItem {
  roomId: string;
  playerCount: string;
  price: string;
  placeWon: string;
  date: string;
}

export const tableData = {
  columnDefinitions: [
    {
      key: "placeWon",
      title: "Place"
    },
    {
      key: "price",
      title: "Reward"
    },
    {
      key: "playerCount",
      title: "Players count"
    },
    {
      key: "roomId",
      title: "Room code"
    },
    {
      key: "date",
      title: "Date"
    },
  ],
  rows: [
    {
      playerCount: "5",
      price: "0",
      placeWon: "1st",
      date: "Dec 13, 2021",
      roomId: "5jk12qa3",
    },
    {
      playerCount: "3",
      price: "-500",
      placeWon: "3rd",
      date: "Dec 13, 2021",
      roomId: "12qa35jk",
    },
    {
      playerCount: "2",
      price: "1000",
      placeWon: "1st",
      date: "Dec 11, 2021",
      roomId: "11112qa3",
    },
    {
      playerCount: "5",
      price: "-123",
      placeWon: "5th",
      date: "Sep 15, 2021",
      roomId: "12qa3555",
    },
  ]
};