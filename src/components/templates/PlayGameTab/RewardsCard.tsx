import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@redux/store";
import { Card, message } from "@components/atoms";
import { DailyRewardController } from "@components/molecules";
import TollIcon from "@material-ui/icons/Toll";
import { updateReward } from "@redux/actions";
import RouteUtils from "@utils/Route";

const RewardsCard = () => {
  const dispatch = useDispatch();
  const { coins, rewards } = useSelector((state: RootState) => state.user);

  const cardAction = (
    <div style={{ display: "flex", alignItems: "center", color: "#1E88E5" }}>
      <TollIcon />
      <p style={{ color: "#302f2f", marginLeft: 4 }}>
        {coins >= 0 ? coins : "loading"}
      </p>
    </div>
  );

  const onClaim = () => {
    const route = RouteUtils.routes.api.user.claimReward;

    RouteUtils.sendApiRequest(route)
      .then((res) => {
        updateReward(res.data)(dispatch);
      })
      .catch((err) => message.warning(err.response.data.message));
  };

  return (
    <Card title="Daily coin rewards" headerActions={cardAction}>
      <DailyRewardController items={rewards} onClaim={onClaim} />
    </Card>
  );
};

export default RewardsCard;
