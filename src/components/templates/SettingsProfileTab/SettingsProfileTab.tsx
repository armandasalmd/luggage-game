import { FC } from "react";
import "./SettingsProfileTab.scss";

import { Button, Input, Checkbox } from "@components/atoms";
import { AvatarInput } from "@components/molecules";

const SettingsProfileTab: FC = () => {

  function handleSubmit() {
    console.log("Submit");
  }

  function uploadNewAvatar(imageUri: string) {
    console.log(imageUri);
  }

  return (
    <div className="settingsProfile">
      <div className="settingsProfile__avatar">
        <AvatarInput setValue={uploadNewAvatar} />
      </div>
      <div className="settingsProfile__form">
        <h3>Personal details</h3>
        <Input 
          placeholder="Your legal name"
          title="First and last name"
          onSubmit={handleSubmit} />
        <Input 
          placeholder="Your username"
          title="Account username"
          required
          onSubmit={handleSubmit} />
        <Input 
          disabled
          placeholder="No email associated to this account"
          title="Account email"
          onSubmit={handleSubmit} />
        <Input 
          placeholder="London, United Kingdom"
          title="Location country"
          onSubmit={handleSubmit} />
        <div className="settingsProfile__social" style={{marginTop: 16}}>
          <Checkbox horizontal value={false} title="Facebook linked" />
          <Checkbox horizontal value={true} title="Google linked" />
        </div>
        <div className="settingsProfile__submit">
          <Button type="ghost">Update profile</Button>
        </div>
      </div>
      <div className="settingsProfile__footer">
        Account created 12 Jan, 2021
      </div>
    </div>
  );
};

export default SettingsProfileTab;