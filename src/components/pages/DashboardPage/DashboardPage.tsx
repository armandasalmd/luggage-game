import { FC } from "react";
import { Button, Card, Input } from "@components/atoms";
import MenuIcon from "@material-ui/icons/Menu";

const DashboardPage: FC = () => {
  return (
    <div className="dashboard">
      <Card style={{ margin: 16 }} title="Luggage game dashboard">
        <Button icon={<MenuIcon />} type="ghost">This is my button</Button>
        <Button icon={<MenuIcon />} type="accent">This is my button</Button>
        <Button icon={<MenuIcon />} type="danger">This is my button</Button>
        <Button type="link">This is my button</Button>
        <Button icon={<MenuIcon />}>This is my button</Button>
        <Input value="ssss" title="My title" placeholder="No placeholder" style={{marginTop: 16}} />
      </Card>
    </div>
  );
}

export default DashboardPage;