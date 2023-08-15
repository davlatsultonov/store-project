import {Link} from "react-router-dom";
import {productionPrefix} from "../main.jsx";

export const Product = () => {
  return <>
    Product

    <Link to={productionPrefix + '/'}>Back</Link>
  </>;
};
