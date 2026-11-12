import "./App.css";
import ThriftHappens from "./Components/ThriftHappens";
import { products } from "./data/data";

function App() {
  return (
    <>
      <h1> Thrift Happens </h1>
      <ThriftHappens data={products} />
    </>
  );
}

export default App;
