import { useState } from "react";
import { surrenderAsync } from "@socket/game";
import { message } from "@components/atoms";

export function useSurrender() {
  const [loss, setLoss] = useState(-1);

  function surrender() {
    surrenderAsync()
      .then((result) => {
        if (result.success === true) {
          setLoss(result.looseAmount);
        } else {
          message.error(result.message);
        }
      })
      .catch(() => {
        message.error("Unexpected error");
      });
  }

  return [loss, surrender];
}
