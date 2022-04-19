import { FC } from "react";
import { Button, Card } from "@components/atoms";
import PlayCircleOutline from "@material-ui/icons/PlayCircleOutline";
import FlagIcon from "@material-ui/icons/Flag";

interface ActiveGameCardProps {
  activeGameId: string;
  onReconnect(): void;
  onSurrender(): void;
}

const ActiveGameCard: FC<ActiveGameCardProps> = (props) => {
  return (
    <div className="playGame">
      <div className="playGame__cardsRight">
        <Card title={`Game ${props.activeGameId} is in progress`}>
          <div className="playGame__flexRow">
            <Button icon={<FlagIcon />} type="danger" onClick={props.onSurrender}>
              Surrender
            </Button>
            <Button
              icon={<PlayCircleOutline />}
              type="accent"
              onClick={props.onReconnect}
            >
              Join running game
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ActiveGameCard;
