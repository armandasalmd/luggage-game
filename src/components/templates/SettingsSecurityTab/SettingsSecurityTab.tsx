import { FC, useState } from "react";
import { useSelector } from "react-redux";

import { Button, Card, Input } from "@components/atoms";
import { RootState } from "@redux/store";
import "./SettingsSecurityTab.scss";

const SettingsSecurityTab: FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [username, setUsername] = useState("");
  const [changePwdFormState, setChangePwdFormState] = useState<any>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  function setField(name: string, value: string) {
    setChangePwdFormState({
      ...changePwdFormState,
      [name]: value,
    });
  }

  function getField(name: string): string {
    return changePwdFormState[name] || "";
  }

  function handlePwdChange() {
    console.log("Password changed", changePwdFormState);
  }
  
  function handleAccDelete() {
    console.log("Account deleted");
  }

  return (
    <div className="settingsSecurity">
      <div className="settingsSecurity__changePwd">
        <Card title="Change password">
          <div className="space">
            <Input
              title="Your current password"
              required
              password
              value={getField("currentPassword")}
              setValue={setField.bind(null, "currentPassword")}
              onSubmit={handlePwdChange}
            />
            <Input
              title="New password"
              required
              password
              value={getField("newPassword")}
              setValue={setField.bind(null, "newPassword")}
              onSubmit={handlePwdChange}
            />
            <Input
              title="Confirm new password"
              required
              password
              value={getField("confirmPassword")}
              setValue={setField.bind(null, "confirmPassword")}
              onSubmit={handlePwdChange}
            />
            <Button centerText type="ghost" onClick={handlePwdChange}>
              Change password
            </Button>
          </div>
        </Card>
      </div>
      <div className="settingsSecurity__deleteAcc">
        <Card title="Delete account">
          <div className="space">
            <p>
              Deleting your account will lead to your personal data deletion.
              Please save any important data as you won't be able to recover it
              afterwards.
            </p>
            <Input
              setValue={setUsername}
              value={username}
              required
              placeholder={user.username}
              title="Enter username to confirm"
            />
            <Button
              centerText
              onClick={handleAccDelete}
              type={user.username === username ? "danger" : "disabled"}
            >
              Delete account
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsSecurityTab;
