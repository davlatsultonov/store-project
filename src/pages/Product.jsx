import {Layout} from "../components/layout/Layout.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {GoBackBtn} from "../components/buttons/GoBackBtn.jsx";
import {BlockWrapper} from "../components/layout/BlockWrapper.jsx";
import {Heading1} from "../components/headings/Heading1.jsx";
import {useGetProductQuery} from "../store/api/apiSlice.js";

export const Product = () => {
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const navigateBack = () => {
    navigate(-1);
  }
  let content;
  const { data: product, error, isLoading, isSuccess, isError } = useGetProductQuery(productId);

  if (isLoading) {
    content = 'Loading...'
  } else if (isSuccess) {
    const { title, price, description, thumbnail } = product;

    content = <div className='flex w-6/12 mx-auto gap-3'>
      <BlockWrapper className='w-1/2'>
        <img alt={title} className="h-96 object-contain" src={thumbnail}/>
      </BlockWrapper>
      <BlockWrapper className='flex-1'>
        <Heading1 title={title} light={true} />
        <div className='my-8'>
          <Heading1 title={`${price} c.`} />
        </div>
        <p className="mb-3 text-gray-500 dark:text-gray-400">{ description }</p>
      </BlockWrapper>
    </div>
  } else if (isError) {
    content = 'Error'
  }

  return <Layout>
    <div className='block'>
      <GoBackBtn navigateBack={navigateBack}/>
      { content }
    </div>
  </Layout>;
};
