import { FC } from "react";
import { useHistory } from "react-router-dom";

import "./TermsOfServicePage.scss";
import CheckAllIcon from "./checkAll.svg";
import TermsBase from "./TermsBase";
import HomeIcon from "@material-ui/icons/Home";
import { Button, Card, Logo } from "@components/atoms";
import RouteVariables from "@utils/RouteVariables";

const TermsOfServicePage: FC = () => {
  const history = useHistory();
  const goHome = () => history.push(RouteVariables.app.main.dashboard.path);

  return (
    <div className="terms">
      <div className="terms__header">
        <Logo size="L" />
        <div className="terms__title">
          <img alt="terms" src={CheckAllIcon} style={{ marginRight: 8 }} />
          <h1>Terms {"&"} conditions</h1>
        </div>
      </div>
      <p className="terms__description">
        By using this website you accept the terms below
      </p>
      <Card className="terms__card">
        <div className="terms__body">{<TermsBase />}</div>
        <div className="terms__links">
          <Button icon={<HomeIcon />} onClick={goHome}>
            Go to home page
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TermsOfServicePage;
