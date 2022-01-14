import { Loader, Logo } from "@components/atoms";
import "./FlashScreen.scss";

const FlashScreen = () => {
  return (
    <div className="flashScreen">
      <Logo size="L" />
      <Loader color="secondary" text="Loading your data" />
    </div>
  )
};

export default FlashScreen;