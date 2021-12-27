export type DailyRewardState = "claimed" | "available" | "disabled";

export interface RewardItem {
  reward: number;
  state: DailyRewardState;
  day: number | string;
}