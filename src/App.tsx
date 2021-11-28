import { Button, Card } from "@components/atoms";

function App() {
  return (
    <div className="App">
      <Card padded style={{ margin: 16 }}>
        <Button type="accent">This is my button</Button>
      </Card>
    </div>
  );
}

export default App;
