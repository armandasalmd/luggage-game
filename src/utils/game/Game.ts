import Confetti from "canvas-confetti";

export interface IGameDetails {
  isPrivate: boolean;
  reward: number;
  playerCount: number;
  rules: string;
}

export interface IPlayer {
  avatar?: string;
  username: string;
  ready: boolean;
  seatId: number;
}

export function fireConfetti() {
  Confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}