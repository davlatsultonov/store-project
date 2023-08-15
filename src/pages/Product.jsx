import {Layout} from "../components/layout/Layout.jsx";
import {useNavigate} from "react-router-dom";
import {GoBackBtn} from "../components/buttons/GoBackBtn.jsx";
import {BlockWrapper} from "../components/layout/BlockWrapper.jsx";
import {Heading1} from "../components/headings/Heading1.jsx";

export const Product = () => {
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate(-1);
  }

  return <Layout>
    <div className='block'>
      <GoBackBtn navigateBack={navigateBack}/>
      <div className='flex w-6/12 mx-auto gap-3'>
        <BlockWrapper className='w-1/3'>
          <img alt='123' className="object-cover w-full" src='https://s3.eu-central-1.amazonaws.com/alifcore.storage/media/images/alifshop/4897/samsung-galaxy-a33-5g-6-128-gb-chernyy-1649677119740-xl.webp'/>
        </BlockWrapper>
        <BlockWrapper className='flex-1'>
          <Heading1 title='Iphone' light={true} />
          <div className='my-8'>
            <Heading1 title='3100 c.' />
          </div>
          <p className="mb-3 text-gray-500 dark:text-gray-400">Track work across the enterprise through an open,
            collaborative platform. Link issues across Jira and</p>
        </BlockWrapper>
      </div>
    </div>
  </Layout>;
};
