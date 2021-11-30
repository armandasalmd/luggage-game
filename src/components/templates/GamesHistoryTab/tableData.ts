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
      key: "roomId",
      title: "Room ID"
    },
    {
      key: "playerCount",
      title: "Player count"
    },
    {
      key: "price",
      title: "Price"
    },
    {
      key: "placeWon",
      title: "Place won"
    },
    {
      key: "date",
      title: "Date"
    },
  ],
  rows: [
    {
      roomId: "a56t3a56",
      playerCount: "5",
      price: "0",
      placeWon: "1st",
      date: "Dec 13, 2021"
    },
    {
      roomId: "hh6t3a56",
      playerCount: "3",
      price: "500",
      placeWon: "3rd",
      date: "Dec 13, 2021"
    },
    {
      roomId: "15a69s86",
      playerCount: "2",
      price: "1000",
      placeWon: "1st",
      date: "Dec 11, 2021"
    },
    {
      roomId: "nm32n1ba",
      playerCount: "5",
      price: "0",
      placeWon: "5th",
      date: "Sep 15, 2021"
    },
  ]
};