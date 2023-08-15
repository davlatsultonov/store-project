import {Layout} from "../components/layout/Layout.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {GoBackBtn} from "../components/buttons/GoBackBtn.jsx";
import {BlockWrapper} from "../components/layout/BlockWrapper.jsx";
import {Heading1} from "../components/headings/Heading1.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchProduct} from "../store/reducers/ActionCreator.js";
import {setProduct} from "../store/reducers/ProductSlice.js";

export const Product = () => {
  const dispatch = useDispatch()
  const { products } = useSelector(state => state.productReducer);
  const { product, isLoading, error } = useSelector(state => state.singleProductReducer);
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const navigateBack = () => {
    navigate(-1);
  }

  useEffect(() => {
    if (!products.length) dispatch(fetchProduct(productId))
    else dispatch(setProduct(products.find(product => product.id === parseInt(productId))))
  }, [])

  return <Layout>
    <div className='block'>
      <GoBackBtn navigateBack={navigateBack}/>
      <div className='flex w-6/12 mx-auto gap-3'>
        <BlockWrapper className='w-1/2'>
          <img alt={product?.title} className="h-96 object-contain" src={product?.thumbnail}/>
        </BlockWrapper>
        <BlockWrapper className='flex-1'>
          <Heading1 title={product?.title} light={true} />
          <div className='my-8'>
            <Heading1 title={`$${product?.price}`} />
          </div>
          <p className="mb-3 text-gray-500 dark:text-gray-400">{ product?.description }</p>
        </BlockWrapper>
      </div>
    </div>
  </Layout>;
};
