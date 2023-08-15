import {Layout} from "../components/layout/Layout.jsx";
import {useNavigate} from "react-router-dom";
import {GoBackBtn} from "../components/buttons/GoBackBtn.js";

export const Product = () => {
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate(-1);
  }

  return <Layout>
    <div className='block'>
      <GoBackBtn navigateBack={navigateBack}/>

    </div>
  </Layout>;
};
