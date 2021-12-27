import { FC, useState } from "react";
import { Button, Card, Input } from "@components/atoms";
import PlayCircleOutline from "@material-ui/icons/SportsEsports";

interface JoinGameCardProps {
  onJoinGame(roomId: string, setJoinError: (msg: string) => void): void;
}

const JoinGameCard: FC<JoinGameCardProps> = (props) => {
  const [joinIdError, setJoinIdError] = useState("");
  const [joinId, setJoinId] = useState("");

  return (
    <Card padded title="Join existing game">
      <div className="playGame__container">
        <Input
          placeholder="Room code"
          title="Existing room code"
          value={joinId}
          setValue={setJoinId}
          error={joinIdError}
          maxWidth="15rem"
        />
        <div className="playGame__flexRow" style={{ marginTop: 16 }}>
          <Button
            icon={<PlayCircleOutline />}
            type="ghost"
            onClick={() => props.onJoinGame(joinId, setJoinIdError)}
          >
            Join game
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default JoinGameCard;
