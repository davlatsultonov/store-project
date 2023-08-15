import {Link} from "react-router-dom";
import {productionPrefix} from "./main.jsx";

function App() {
  return <>
    <h1>Products</h1>
    <Link to={productionPrefix + '/product/12'}>Product 12</Link>
  </>;
}

export default App;
