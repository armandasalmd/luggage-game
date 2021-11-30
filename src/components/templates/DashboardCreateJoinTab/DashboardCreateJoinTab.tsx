import {
  Button,
  Input,
  Select,
} from "@components/atoms";

import { DashboardMenuNavigator } from "@components/organisms";
import MenuIcon from "@material-ui/icons/Menu";

const menuItems = [
  {
    key: 1,
    value: "Create or join game",
  },
  {
    key: 2,
    value: "Game rules",
  },
  {
    key: 3,
    value: "Games history",
  },
  {
    key: 4,
    value: "Friends",
  },
];

const DashboardCreateJoinTab = () => {
  function onMenuIdChange(id: string | number, item: any) {
    console.log(id, item);
  }
  
  return (
    <>
      <Button type="ghost">This is my button</Button>
      <Button icon={<MenuIcon />} type="accent">
        This is my button
      </Button>
      <Button icon={<MenuIcon />} type="danger">
        This is my button
      </Button>
      <Button icon={<MenuIcon />}>This is my button</Button>
      <Button type="link">This is my button</Button>
      <Input
        value="ssss"
        description="MY description"
        title="My title"
        placeholder="No placeholder"
        style={{ marginTop: 16 }}
      />
      <br />
      <DashboardMenuNavigator
        title="Luggage game dashboard"
        colorType="secondary"
        items={menuItems}
        idKey="key"
        textKey="value"
        defaultSelectedId={1}
        onSelectChange={onMenuIdChange}
      />
      <br />
      <Select
        title="Luggage game dashboard"
        items={menuItems}
        idKey="key"
        textKey="value"
        placeholder="Select one value"
        defaultSelectedId={2}
        onSelectChange={onMenuIdChange}
      />
    </>
  );
};

export default DashboardCreateJoinTab;
