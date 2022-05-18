interface IEmojiConfig {
  defaultEmojis: string[];
  premiumEmojis: string[];
  kindEmojis: string[];
}

// Emoji source: https://iconscout.com/icon-pack/free-and-cute-emoji
export const emojiConfig: IEmojiConfig = {
  defaultEmojis: [
    "laugh-450473",
    "rolling-450487",
    "happy-450464",
    "attitude-450436",
    "wink-450406",
    "kiss-450472",
    "wink-450419",
    "angry-450433",
    "cry-450443",
    "emoji-450456",
    "disappoint-450452",
    "pinocchio-450480",
    "sad-450493",
    "wow-450424",
    "scream-450404",
  ],
  premiumEmojis: [
    "blush-450438",
    "silence-450409",
    "emoji-450454",
    "amazed-450430",
    "swag-450413",
    "sleeping-450411",
    "alien-450426",
    "joker-450469",
    "pooper-450481",
    "bad-450437",
  ],
  kindEmojis: ["club-450439", "diamond-450450", "heart-450467", "spead-450401"],
};

export { EmojiSvg } from "./EmojiSvg";