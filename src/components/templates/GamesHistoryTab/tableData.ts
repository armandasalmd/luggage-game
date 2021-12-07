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
      title: "Place won"
    },
    {
      key: "price",
      title: "Price"
    },
    {
      key: "playerCount",
      title: "Player count"
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
      date: "Dec 13, 2021"
    },
    {
      playerCount: "3",
      price: "500",
      placeWon: "3rd",
      date: "Dec 13, 2021"
    },
    {
      playerCount: "2",
      price: "1000",
      placeWon: "1st",
      date: "Dec 11, 2021"
    },
    {
      playerCount: "5",
      price: "0",
      placeWon: "5th",
      date: "Sep 15, 2021"
    },
  ]
};