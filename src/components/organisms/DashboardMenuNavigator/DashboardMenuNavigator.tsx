import { FC } from "react";
import { VerticalMenuProps } from "@components/molecules/VerticalMenu/VerticalMenu";
import { VerticalMenu } from "@components/molecules";
import { Card } from "@components/atoms";

interface DashboardMenuNavigatorProps extends VerticalMenuProps {
  title: string;
}

const DashboardMenuNavigator: FC<DashboardMenuNavigatorProps> = (props) => {
  const { title, ...rest } = props;

  return (
    <Card title={title} noContentPaddingX>
      <VerticalMenu {...rest} />
    </Card>
  );
}

export default DashboardMenuNavigator;