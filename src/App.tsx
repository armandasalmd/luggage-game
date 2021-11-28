import { Button, Card } from "@components/atoms";
import MenuIcon from "@material-ui/icons/Menu";

function App() {
  return (
    <div className="App">
      <Card padded style={{ margin: 16 }}>
        <Button icon={<MenuIcon />} type="ghost">This is my button</Button>
      </Card>
    </div>
  );
}

export default App;
